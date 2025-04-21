const mongoose = require('mongoose');

module.exports = (tenantDb) => {
  // Account Group Model
  const AccountGroup = tenantDb.model('AccountGroup', new mongoose.Schema({
    Id: { type: Number, auto: true, unique: true },
    GroupCode: { type: Number, required: true },
    Name: { type: String, required: true, maxlength: 50 },
    Schedule: { type: String, required: true, maxlength: 1 },
    DC_CD: { type: String, required: true, maxlength: 1 },
    PLCODE: { type: mongoose.Schema.Types.Decimal128, required: true },
    SUB_SCH: { type: String, required: true, maxlength: 3 },
    Type: { type: String, required: true, maxlength: 1 },
    Active: { type: Boolean, required: true, default: true },
    CreatedBy: { type: String, required: true, maxlength: 20 },
    CreatedOn: { type: Date, required: true, default: Date.now },
    UpdatedBy: { type: String, maxlength: 20, default: null },
    UpdatedOn: { type: Date, default: new Date('2000-12-31T23:59:59') },
    UpdateCount: { type: Number, required: true, default: 0 }
  }, { timestamps: false, collection: 'AccountGroup' }));

  // Account Model with auto-increment
  const accountSchema = new mongoose.Schema({
    accountId: { type: Number, unique: true },
    accountName: { type: String, required: true },
    groupId: { type: String, required: true },
    subGroupId: { type: String, required: true },
    opening: { type: String, required: true, default: 0 },
    drOrCr: { type: String, enum: ['DR', 'CR'], required: true },
    typeCode: {
      type: String,
      enum: ['Balance Sheet', 'Profit and Loss Account', 'Trading Account'],
      required: true
    }
  }, { timestamps: true });

  accountSchema.pre('save', async function (next) {
    if (!this.accountId) {
      const counter = await tenantDb.model('Counter').findOneAndUpdate(
        { name: 'accountId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.accountId = counter.seq;
    }
    next();
  });

  const Account = tenantDb.model('Account', accountSchema);

  // Account Subgroup Model
  const AccountSubgroup = tenantDb.model('AccountSubgroup', new mongoose.Schema({
    SubGroupId: { type: Number, required: true },
    SubGroupCode: { type: Number, required: true },
    GroupId: { type: Number, required: true },
    Name: { type: String, required: true, maxlength: 40 },
    User: { type: String, required: true, maxlength: 10 },
    InDate: { type: Date, required: true },
    CompCode: { type: String, required: true },
    Type: { type: String, required: true, maxlength: 1 },
    Active: { type: Number, required: true, default: 1 },
    CreatedBy: { type: String, required: true },
    CreatedOn: { type: Date, required: true, default: Date.now },
    UpdatedBy: { type: String },
    UpdatedOn: { type: Date },
    UpdateCount: { type: Number, default: 0 }
  }));

  // Board Member Model
  const BoardMember = tenantDb.model('BoardMember', new mongoose.Schema({
    name: { type: String, required: true },
    position: {
      type: String,
      enum: ['President', 'Vice President', 'Secretary', 'Treasurer', 'Member'],
      required: true
    },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    wingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wing', required: true },
    flatId: { type: mongoose.Schema.Types.ObjectId, ref: 'UnitType', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true }
  }));

  // Counter Model (for auto-increment)
  const Counter = tenantDb.model('Counter', new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    seq: { type: Number, default: 0 }
  }));

  // Contra Voucher Model
  const contraVoucherSchema = new mongoose.Schema({
    voucherNumber: { type: Number, unique: true },
    date: { type: Date, required: true },
    amountWithdrawn: { type: Number, required: true },
    previousOSBills: { type: String },
    transactionType: { type: String, required: true },
    instNo: { type: String },
    chequeNo: { type: String },
    instDate: { type: Date },
    bankName: { type: String },
    branchName: { type: String },
    narration: { type: String },
    crNameOfCreditor: { type: String },
    nameOfLedger: { type: String },
    crAmountWithdraw: { type: Number },
    amount: { type: Number },
    branch: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  contraVoucherSchema.pre("save", async function (next) {
    if (!this.voucherNumber) {
      const counter = await Counter.findOneAndUpdate(
        { name: "voucherNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.voucherNumber = counter.seq;
    }
    next();
  });

  const ContraVoucher = tenantDb.model('ContraVoucher', contraVoucherSchema);

  // Demo Invoice Model
  const invoiceItemSchema = new mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    serviceName: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    rate: { type: Number, required: true, min: 0 },
    factor: { type: Number, required: true },
    reference: { type: String, required: true },
    showDescription: { type: Boolean, default: true },
    isRateEditable: { type: Boolean, default: true }
  }, { _id: false });

  const invoiceSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'DemoMember', required: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvoiceTemplate', required: true },
    invoiceNumber: { type: String, unique: true },
    date: { type: Date, required: true, default: Date.now },
    period: { type: String, required: true },
    items: [invoiceItemSchema],
    subTotal: { type: Number, required: true, min: 0 },
    gst: { type: Number, default: 0 },
    total: { type: Number, required: true, min: 0 },
    notes: { type: String },
    memberName: { type: String },
    status: { type: String, enum: ['draft', 'sent', 'paid', 'cancelled'], default: 'draft' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  invoiceSchema.pre('save', async function(next) {
    if (!this.invoiceNumber) {
      const count = await tenantDb.model('DemoInvoice').countDocuments();
      const now = new Date();
      this.invoiceNumber = `INV-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}-${(count+1).toString().padStart(4,'0')}`;
    }
    if (this.isModified('memberId')) {
      const member = await tenantDb.model('DemoMember').findById(this.memberId);
      if (member) this.memberName = member.Name;
    }
    next();
  });

  const DemoInvoice = tenantDb.model('DemoInvoice', invoiceSchema);

  // Demo Member Model
  const DemoMember = tenantDb.model('DemoMember', new mongoose.Schema({
    Name: { type: String, required: [true, 'First name is required'], trim: true },
    Area: { type: String, required: [true, 'Area is required'], trim: true },
    CC: { type: String, trim: true },
    invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DemoInvoice' }],
    Email: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }));

  // Invoice Detail Model
  const InvoiceDetail = tenantDb.model('InvoiceDetail', new mongoose.Schema({
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvoiceHeader', required: true },
    serviceIds: [{ type: Number, required: true }],
    amounts: [{ type: String, required: true }]
  }, { timestamps: true }));

  // Invoice Header Model
  const invoiceHeaderSchema = new mongoose.Schema({
    invoiceNumber: { type: Number },
    invoiceDate: { type: Date, required: true },
    memberId: { type: String, required: true },
    period: { type: String, required: true, maxlength: 50 },
    dueDate: { type: Date, required: true },
    amtInWords: { type: String },
    narration: { type: String, required: true, maxlength: 200 }
  }, { timestamps: true });

  invoiceHeaderSchema.pre("save", async function (next) {
    if (!this.invoiceNumber) {
      const counter = await Counter.findOneAndUpdate(
        { name: "invoiceNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.invoiceNumber = counter.seq;
    }
    next();
  });

  const InvoiceHeader = tenantDb.model('InvoiceHeader', invoiceHeaderSchema);

  // Invoice Template Model
  const InvoiceTemplate = tenantDb.model('InvoiceTemplate', new mongoose.Schema({
    name: { type: String, required: [true, 'Template name is required'], trim: true },
    description: { type: String, trim: true },
    items: [{
      serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: [true, 'Service ID is required'] },
      description: { type: String, trim: true },
      quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be at least 1'] },
      showDescription: { type: Boolean, default: true }
    }],
    isActive: { type: Boolean, default: true },
    design: {
      headerColor: { type: String, default: '#1976d2' },
      logoUrl: { type: String, trim: true },
      terms: { type: String, default: 'Payment due within 30 days. Late payments subject to 1.5% monthly interest.' },
      footerNote: { type: String, default: 'Thank you for your prompt payment.' }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }));

  // Journal Voucher Model
  const journalVoucherSchema = new mongoose.Schema({
    voucherNumber: { type: Number, unique: true },
    date: { type: String, required: true },
    debitLedger: { type: String },
    creditLedger: { type: String },
    debitAmount: { type: Number },
    creditAmount: { type: Number },
    narration: { type: String }
  }, { timestamps: true });

  journalVoucherSchema.pre("save", async function (next) {
    if (this.isNew && !this.voucherNumber) {
      const counter = await Counter.findOneAndUpdate(
        { name: "journalVoucher" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.voucherNumber = counter.seq;
    }
    next();
  });

  const JournalVoucher = tenantDb.model('JournalVoucher', journalVoucherSchema);

  // Meeting Model
  const Meeting = tenantDb.model('Meeting', new mongoose.Schema({
    meetingType: { type: String, required: true, enum: ['Residential', 'Commercial'] },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    description: { type: String, required: true },
    place: { type: String, required: true },
    comments: { type: String, required: true }
  }, { timestamps: true }));

  // Member Model
  const Member = tenantDb.model('Member', new mongoose.Schema({
    infoTitle: { type: String, default: "Mr" },
    firstName: String,
    middleName: String,
    surname: String,
    dateOfBirth: String,
    gender: { type: String, default: "male" },
    occupation: String,
    annual: String,
    email: String,
    mobile: Number,
    adharCardNo: String,
    panCardNo: String,
    addressType: { type: String, default: "Residential" },
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: "India" },
    propertyType: { type: String, default: "Residential" },
    unitNumber: String,
    wingName: String,
    floor: String,
    unitType: String,
    fourWheelerParking: String,
    twoWheelerParking: String,
    contactTitle: { type: String, default: "Mr" },
    contactFirstName: String,
    contactMiddleName: String,
    contactSurname: String,
    contactEmail: String,
    contactMobile: Number,
    nominationTitle: { type: String, default: "Mr" },
    nominationFirstName: String,
    nominationMiddleName: String,
    nominationSurname: String,
    nominationEmail: String,
    nominationMobile: Number,
    dateOfNomination: String,
    dateOfAdmission: String,
    dateOfEntranceFeePayment: String,
    dateOfCessationOfMembership: String,
    reasonOfCessation: String,
    ageOfAccount: String,
    remark: String
  }, { timestamps: true }));

  // Society Model
  const Society = tenantDb.model('Society', new mongoose.Schema({
    SocietyName: { type: String, required: true },
    AddressLine1: { type: String, required: true },
    AddressLine2: { type: String },
    AddressLine3: { type: String },
    State: { type: String, required: true },
    Pin: { type: String, required: true },
    Mobile: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Registration: { type: String, required: true, unique: true },
    RegisteredDate: { type: Date, required: true },
    RegisteringAuthority: { type: String, required: true },
    AddressofRegisteringAuthority: { type: String, required: true }
  }, { timestamps: true }));

  // Parking Model
  const Parking = tenantDb.model('Parking', new mongoose.Schema({
    parkingType: { type: String, required: true },
    parkingArea: { type: String, required: true },
    unit: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }));

  // Payment Voucher Model
  const paymentVoucherSchema = new mongoose.Schema({
    voucherNumber: { type: Number, unique: true },
    date: { type: Date, required: true },
    nameOfCreditor: { type: String, required: true },
    amountPaidDr: { type: Number, required: true },
    bank: { type: String },
    drName: { type: String },
    amountPaidCr: { type: Number, required: true },
    transactionType: { type: String, required: true },
    instNo: { type: String },
    chequeNo: { type: String },
    instDate: { type: Date },
    narration: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  paymentVoucherSchema.pre("save", async function (next) {
    if (!this.voucherNumber) {
      const counter = await Counter.findOneAndUpdate(
        { name: "voucherNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.voucherNumber = counter.seq;
    }
    next();
  });

  const PaymentVoucher = tenantDb.model('PaymentVoucher', paymentVoucherSchema);

  // Property Model
  const Property = tenantDb.model('Property', new mongoose.Schema({
    landAuthority: { type: String },
    leaseDeedExecution: { type: String },
    leaseDeedExecutionRegNum: { type: String },
    leaseDeedExecutionDoc: { type: String },
    leaseDeedExecutionDate: { type: String },
    leasePeriod: { type: String },
    leaseRentPremium: { type: String },
    CTSNo: { type: String, required: true },
    Village: { type: String },
    plotNo: { type: String },
    plotArea: { type: String },
    onEast: { type: String, required: true },
    onWest: { type: String, required: true },
    onNorth: { type: String, required: true },
    onSouth: { type: String, required: true },
    conveyanceDeed: { type: String },
    conveyanceDeedRegNum: { type: String },
    conveyanceDeedDate: { type: String },
    landConveyanceInNameOf: { type: String },
    nonAgricultureTax: { type: String },
    nATaxPremium: { type: String },
    propertyTaxAuthority: { type: String },
    propertyTaxNo: { type: String, required: true },
    propertyTaxPremium: { type: String },
    propertyTaxPremiumGSTINBills: { type: String },
    waterSupplyAuthority: { type: String },
    numOfWaterConnections: { type: String },
    waterConnectionNum: { type: String },
    waterBillGenerationDates: { type: String },
    waterBillGenerationDatesGSTINBills: { type: String },
    electricitySupplyServiceProvider: { type: String },
    numOfElectricityConnections: { type: String }
  }));

  // Purchase Voucher Model
  const purchaseVoucherSchema = new mongoose.Schema({
    voucherNumber: { type: Number, unique: true },
    date: { type: Date, required: true },
    refBillNo: { type: String, required: true },
    drNameOfLedger: { type: String, required: true },
    crTdsPayable: { type: Number, required: true },
    sgst: { type: Number, required: true },
    billDate: { type: Date, required: true },
    crNameOfCreditor: { type: String, required: true },
    amountOfBill: { type: Number, required: true },
    amount: { type: Number, required: true },
    cgst: { type: Number, required: true },
    billNo: { type: String, required: true },
    billPeriod: { type: String, required: true },
    narration: { type: String },
    customerNo: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  purchaseVoucherSchema.pre("save", async function (next) {
    if (!this.voucherNumber) {
      const counter = await Counter.findOneAndUpdate(
        { name: "voucherNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.voucherNumber = counter.seq;
    }
    next();
  });

  const PurchaseVoucher = tenantDb.model('PurchaseVoucher', purchaseVoucherSchema);

  // Receipt Voucher Model
  const receiptVoucherSchema = new mongoose.Schema({
    voucherDate: { type: Date },
    voucherNumber: { type: Number, unique: true },
    narration: { type: String },
    drAccount: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      accountId: { type: Number, required: true },
      accountName: { type: String, required: true },
      drOrCr: { type: String, required: true }
    },
    crAccount: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      accountId: { type: Number, required: true },
      accountName: { type: String, required: true },
      drOrCr: { type: String, required: true }
    },
    crAmount: { type: Number, required: true },
    referenceInvoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    transactionType: { type: String },
    instrumentNumber: { type: String },
    instrumentDate: { type: Date, default: Date.now },
    instrumentBank: { type: String },
    instrumentBranch: { type: String }
  }, { timestamps: true });

  receiptVoucherSchema.pre("save", async function (next) {
    if (!this.voucherNumber) {
      const counter = await Counter.findOneAndUpdate(
        { name: "receiptVoucher" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.voucherNumber = counter.seq;
    }
    next();
  });

  const ReceiptVoucher = tenantDb.model('ReceiptVoucher', receiptVoucherSchema);

  // Service Model
  const Service = tenantDb.model('Service', new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      maxlength: [100, 'Service name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    reference: { type: String },
    factor: {
      type: Number,
      required: [true, 'Factor is required'],
      min: [0.0, 'Factor must be at least 0.0'],
      max: [100, 'Factor cannot exceed 100']
    },
    createdAt: { type: Date, default: Date.now }
  }));

  // Unit Type Model
  const UnitType = tenantDb.model('UnitType', new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: Number, required: true },
    propertyType: { type: String, enum: ['residential', 'commercial'], required: true },
    unit: { type: String, required: true }
  }));

  // Voucher Detail Model
  const VoucherDetail = tenantDb.model('VoucherDetail', new mongoose.Schema({
    vdId: { type: Number, required: true },
    VoucherHeaderId: { type: Number, required: true },
    SrNo: { type: Number, required: true },
    AccountId: { type: Number, required: true },
    Amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    DebitorCreditor: { type: Number, required: true },
    Narration: { type: String, required: true },
    Active: { type: Boolean, required: true },
    CreatedBy: { type: String, required: true },
    CreatedOn: { type: Date, default: Date.now },
    UpdatedBy: { type: String, required: true },
    UpdatedOn: { type: Date, default: Date.now },
    UpdateCount: { type: Number, default: 0 }
  }));

  // Voucher Model
  const Voucher = tenantDb.model('Voucher', new mongoose.Schema({
    VId: { type: Number, required: true },
    VoucherTypeId: { type: Number, required: true },
    VoucherNo: { type: Number, required: true },
    VoucherDate: { type: Date, required: true },
    Narration: { type: String, required: true },
    Active: { type: Boolean, required: true, default: true },
    CreatedBy: { type: String, required: true },
    CreatedOn: { type: Date, required: true, default: Date.now },
    UpdatedBy: { type: String },
    UpdatedOn: { type: Date },
    UpdateCount: { type: Number, required: true, default: 0 }
  }, { timestamps: true }));

  // Wing Model
  const Wing = tenantDb.model('Wing', new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    totalUnits: { type: Number, required: true, min: 1 },
    unitTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "UnitType", required: true }],
    totalParkings: { type: Number, required: true },
    parkingType: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parking", required: true }],
    numberOfFloors: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true }));

  return {
    AccountGroup,
    Account,
    AccountSubgroup,
    BoardMember,
    Counter,
    ContraVoucher,
    DemoInvoice,
    DemoMember,
    InvoiceDetail,
    InvoiceHeader,
    InvoiceTemplate,
    JournalVoucher,
    Meeting,
    Member,
    Society,
    Parking,
    PaymentVoucher,
    Property,
    PurchaseVoucher,
    ReceiptVoucher,
    Service,
    UnitType,
    VoucherDetail,
    Voucher,
    Wing
  };
};