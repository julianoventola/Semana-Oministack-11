const connection = require('../database/connection');

module.exports = {
  // List all Incidents
  async index(req, res) {
    const incidents = await connection('incidents').select('*');

    return res.json(incidents);
  },

  // Create new Incident
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [incident] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return res.json({ incident });
  },

  // Delete a Incident
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Not Authorized' });
    }

    await connection('incidents')
      .where('id', id)
      .delete();

    return res.status(204).send();
  },
};
