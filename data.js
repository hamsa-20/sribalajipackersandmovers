import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';




const port=process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'secrets',
  password: 'Kailzxh@123',
  port: 5432,
});
db.connect();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Replace with your SMTP server hostname
  port: 587,
  secure: false,  // Set to true if your SMTP server requires SSL
  auth: {
    user: 'kailashb.ipucpcmb@cajc.in',  // Replace with your email address
    pass: 'cajc@2021',     // Replace with your email password
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.post('/submit-form', async (req, res) => {
  const name=req.body.Name;
  const phone=req.body.PhoneNumber
  const fromLocation=req.body.fromLocation;
  const toLocation=req.body.toLocation;
  const email=req.body.email; 
  const description=req.body.Description; 

  try {
    const result = await db.query(
      'INSERT INTO form_submissions (name, phone, from_location, to_location, email, description) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, phone, fromLocation, toLocation, email, description]
    );

    await transporter.sendMail({
      from: 'KAILASH B <kailashb.ipucpcmb@cajc.in>',  // Sender email address
      to: 'sribalajirj@gmail.com',
          // Recipient email address (your email where you want to receive notifications)
      subject: 'New Form Submission',
      text: `New form submission:
            Name: ${name}
            Phone: ${phone}
            From Location: ${fromLocation}
            To Location: ${toLocation}
            Email: ${email}
            Description: ${description}`,
    });


    console.log(result);
    res.send("Thank you!,Your Form Has Been submitted successfully!,We'll Contact You Soon!");
  } catch (err) {
    console.error('Error inserting into database:', err.message);
    res.status(500).send('An error occurred while submitting the form.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
