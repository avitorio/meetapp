import { Op } from 'sequelize';
import { isBefore } from 'date-fns';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import Mail from '../../lib/Mail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          attributes: ['title', 'date', 'user_id', 'location'],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            { model: User, as: 'organizer', attributes: ['name'] },
            { model: File, as: 'banner', attributes: ['path', 'url', 'id'] },
          ],
        },
      ],
      order: [[Meetup, 'date', 'ASC']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const { meetup_id } = req.body;

    const meetup = await Meetup.findByPk(meetup_id, {
      include: {
        model: User,
        as: 'organizer',
        attributes: ['name', 'email'],
      },
    });

    if (!meetup) {
      return res.status(401).json({ error: "This meetup doesn't exist" });
    }

    if (req.userId === meetup.user_id) {
      return res
        .status(400)
        .json({ error: "You can't subscribe to a meetup you created." });
    }

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: 'This meetup has already happened.' });
    }

    const timeTaken = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (timeTaken.length) {
      return res
        .status(400)
        .json({ error: 'You already subscribed to a meetup at this time' });
    }

    const subscription = await Subscription.create({
      meetup_id,
      user_id: req.userId,
    });

    const subscriber = await User.findByPk(req.userId);

    const { name, email } = meetup.organizer;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'New Subscriber',
      template: 'subscription',
      context: {
        organizer: name,
        meetupName: meetup.title,
        subscriberName: subscriber.name,
        subscriberEmail: subscriber.email,
      },
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const meetup_id = req.params.id;

    const subscription = await Subscription.findOne({
      where: {
        meetup_id,
        user_id: req.userId,
      },
    });

    if (!subscription) {
      return res.status(400).json({ error: 'Subscription not found.' });
    }

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
