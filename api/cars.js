import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { category } = req.query;
      let query = supabase.from('cars').select('*').order('created_at', { ascending: false });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { name, brand, year, price, category, image, description, specs } = req.body;
      const { data, error } = await supabase
        .from('cars')
        .insert({ name, brand, year, price, category, image, description, specs })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, name, brand, year, price, category, image, description, specs } = req.body;
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (brand !== undefined) updateData.brand = brand;
      if (year !== undefined) updateData.year = year;
      if (price !== undefined) updateData.price = price;
      if (category !== undefined) updateData.category = category;
      if (image !== undefined) updateData.image = image;
      if (description !== undefined) updateData.description = description;
      if (specs !== undefined) updateData.specs = specs;
      const { data, error } = await supabase
        .from('cars')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
