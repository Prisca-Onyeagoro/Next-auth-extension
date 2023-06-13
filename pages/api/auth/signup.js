import connect from '@/Database/Connectdb';
import Users from '@/model/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  connect().catch((error) => res.json({ error: 'connection failed' }));

  if (req.method === 'POST') {
    if (!req.body) return res.status(400).json({ error: 'Data form is empty' });
    const { username, email, password } = req.body;

    const userexists = await Users.findOne({ email });

    if (userexists) {
      return res.status(400).json({ message: 'user already exists' });
    }

    // store the user details
    try {
      const createUser = await Users.create({
        username,
        email,
        password: await hash(password, 10),
      });
      return res.status(201).json({ createUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    res.status(500).json({ message: 'HTTP method not valid' });
  }
}
