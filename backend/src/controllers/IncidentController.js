const connection = require('../database/connection');

module.exports = {
  // List all Incidents
  async index(req, res) {
    const { page = 1 } = req.query;
    // Count how many incidents are saved in Db
    const [countIncidents] = await connection('incidents').count();

    // Get incidents by page and join with ong table
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    // Set in header for the total of incidents saved in Db
    res.header('X-Total-Count', countIncidents['count(*)']);

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
