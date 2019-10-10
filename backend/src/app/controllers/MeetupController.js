import { isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';

import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const page = req.query.page ? (req.query.page - 1) * 2 : 0;
    const perPage = req.query.page ? 2 : 100;
    const meetups = await Meetup.findAll({
      offset: page,
      limit: perPage,
      where: {
        user_id: req.appUser ? { [Op.not]: 0 } : req.userId,
        id: req.query.meetup ? req.query.meetup : { [Op.not]: 0 },
        date: req.appUser
          ? {
              [Op.between]: [
                `${req.query.date} 00:00:00+00`,
                `${req.query.date} 23:59:59+00`,
              ],
            }
          : { [Op.not]: 0 },
      },
      include: [
        { model: File, as: 'banner', attributes: ['path', 'url', 'id'] },
        { model: User, as: 'organizer', attributes: ['name'] },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title, description, location, date, file_id } = req.body;

    if (isBefore(parseISO(date), new Date())) {
      return res.status(400).json('Meetup date has to be in the future');
    }

    const meetup = await Meetup.create({
      user_id: req.userId,
      title,
      description,
      location,
      date,
      file_id,
    });

    const response = await Meetup.findByPk(meetup.id, {
      include: [
        { model: File, as: 'banner', attributes: ['path', 'url', 'id'] },
      ],
    });

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json('Meetup date has to be in the future');
    }

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found.' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json('You cannot edit this meetup.');
    }

    await meetup.update(req.body);

    const response = await Meetup.findByPk(req.params.id, {
      include: [
        { model: File, as: 'banner', attributes: ['path', 'url', 'id'] },
      ],
    });

    return res.json(response);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found.' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'You cannot delete this meetup.' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups." });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
