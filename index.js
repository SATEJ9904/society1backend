require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-tenant-id', 'Authorization'],
  credentials: true // If using cookies/sessions
}));
app.use(bodyParser.json());

// Database connection
mongoose.connect(`${process.env.MONGO_URI}/${process.env.MAIN_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to main database');
});

// Models
const SocietyRequest = mongoose.model('SocietyRequest', new mongoose.Schema({
  societyName: String,
  address: String,
  contactPerson: String,
  mobileNumber: String,
  email: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}));

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Import all route files
const ParkingRoute = require('./routes/parkingRoutes');
const InvoiceDetailRoute = require('./routes/invoiceDetailRoutes');
const InvoiceHeaderRoute = require('./routes/invoiceHeaderRoutes');
const VoucherDetailRoutes = require('./routes/voucherDetailRoutes');
const VoucherRoute = require('./routes/voucherRoutes');
const AccountSubGroupRoute = require('./routes/accountSubGroupRoutes');
const AccountGroupRoutes = require('./routes/accountGroupRoutes');
const AccountRoutes = require('./routes/accountRoutes');
const MemberRoutes = require('./routes/memberRoutes');
const BoardMembersRoutes = require('./routes/boardMemberRoutes');
const wingRoutes = require('./routes/wingRoutes');
const unitType = require('./routes/unitTypeRoutes');
const ServiceRoute = require('./routes/serviceRoutes');
const OrganisationRoutes = require('./routes/societyRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const PropertyRoute = require('./routes/propertyRoutes');
const RecieptVoucher = require('./routes/receiptVoucherRoutes');
const JournalVoucher = require('./routes/journalVoucherRoutes');
const contraVoucher = require('./routes/contraVoucherRoutes');
const paymentVoucher = require('./routes/paymentVoucherRoutes');
const purchaseVoucher = require('./routes/purchaseVoucherRoutes');
const invoiceTemplate = require('./routes/invoiceTemplateRoutes');
const demoMembers = require('./routes/demoMemberRoutes');
const DemoInvoices = require('./routes/demoInvoiceRoutes');

// Main routes
app.post('/api/register', async (req, res) => {
  try {
    const { societyName, address, contactPerson, mobileNumber, email } = req.body;
    
    const existingRequest = await SocietyRequest.findOne({ email });
    if (existingRequest) {
      return res.status(400).json({ message: 'A request with this email already exists' });
    }

    const newRequest = new SocietyRequest({
      societyName,
      address,
      contactPerson,
      mobileNumber,
      email
    });

    await newRequest.save();
    res.status(201).json({ message: 'Registration request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password, dbName } = req.body;
    
    // Connect to the tenant database
    const tenantDb = mongoose.connection.useDb(dbName, { useCache: true });
    
    // In a real app, you would verify credentials against the tenant database
    const collections = await tenantDb.db.listCollections().toArray();
    
    if (collections.length > 0) {
      res.json({ 
        message: 'Login successful', 
        dbName,
        token: dbName // In a real app, use JWT or similar
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials or database not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/requests', async (req, res) => {
  try {
    const requests = await SocietyRequest.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/approve-request/:id', async (req, res) => {
  try {
    // 1. Find the request
    const request = await SocietyRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // 2. Validate required fields
    if (!request.email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // 3. Create database name and password
    const dbName = request.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    const password = `${dbName}@4321`;

    // 4. Connect to tenant database
    const tenantDb = mongoose.connection.useDb(`tenant_${dbName}`, {
      useCache: true,
      noListener: true
    });

    // 5. Initialize tenant models
    let tenantModels;
    try {
      tenantModels = require('./models/tenantModels')(tenantDb);
    } catch (modelError) {
      console.error('Model initialization failed:', modelError);
      return res.status(500).json({ 
        message: 'Failed to initialize tenant models',
        error: modelError.message 
      });
    }

    // 6. Create default admin user
    try {
      const [firstName, ...surnameParts] = request.contactPerson.split(' ');
      await tenantModels.Member.create({
        firstName: firstName || 'Admin',
        surname: surnameParts.join(' ') || 'User',
        email: request.email,
        mobile: request.mobileNumber,
        addressLine1: request.address,
        propertyType: "Residential",
        role: 'admin',
        password: await bcrypt.hash(password, 10)
      });
    } catch (userError) {
      console.error('User creation failed:', userError);
      return res.status(500).json({ 
        message: 'Failed to create admin user',
        error: userError.message 
      });
    }

    // 7. Update request status
    request.status = 'approved';
    request.approvedAt = new Date();
    await request.save();

    // 8. Send email (if configured)
    if (process.env.EMAIL_ENABLED === 'true') {
      try {
        const mailOptions = {
          from: process.env.FROM_EMAIL,
          to: request.email,
          subject: 'Your Society Management Account is Ready',
          html: `
            <p>Dear ${request.contactPerson},</p>
            <p>Your society management account has been approved.</p>
            <p><strong>Login Details:</strong></p>
            <p>Username: ${request.email}<br/>
            Password: ${password}</p>
            <p>Please login at <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}">${process.env.FRONTEND_URL || 'http://localhost:3000'}</a></p>
            <p>Regards,<br/>Society Management Team</p>
          `
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.json({ 
      message: 'Request approved successfully', 
      dbName,
      credentials: {
        email: request.email,
        password: password // Note: In production, don't return password in response
      }
    });

  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({ 
      message: 'Server error during approval',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Initialize all routes as per your request
app.use("/Parking", ParkingRoute);
app.use("/InvoiceDetail", InvoiceDetailRoute);
app.use("/InvoiceHeader", InvoiceHeaderRoute);
app.use("/VoucherDetail", VoucherDetailRoutes);
app.use("/Voucher", VoucherRoute);
app.use("/AccountSubGroup", AccountSubGroupRoute);
app.use("/AccountGroup", AccountGroupRoutes);
app.use("/Account", AccountRoutes);
app.use("/Member", MemberRoutes);
app.use("/BoardMembers", BoardMembersRoutes);
app.use("/wings", wingRoutes);
app.use("/unitType", unitType);
app.use("/Service", ServiceRoute);
app.use("/Organisation", OrganisationRoutes);
app.use('/Meeting', meetingRoutes);
app.use("/Property", PropertyRoute);
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));
app.use("/RecieptVoucher", RecieptVoucher);
app.use("/JournalVoucher", JournalVoucher);
app.use("/contraVoucher", contraVoucher);
app.use("/paymentVoucher", paymentVoucher);
app.use("/purchaseVoucher", purchaseVoucher);
app.use("/invoiceTemplate", invoiceTemplate);
app.use("/demoMembers", demoMembers);
app.use("/DemoInvoices", DemoInvoices);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});