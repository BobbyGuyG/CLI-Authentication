const { PrismaClient } = require('../generated/prisma'); 
const admin = require('firebase-admin');
const { program } = require('commander');

const serviceAccount = require('../firebase-service-account-key.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const prisma = new PrismaClient();

program
  .description('Secure CLI to create a new ISP Admin user')
  .requiredOption('-e, --email <string>', "Owner's email address")
  .requiredOption('-p, --password <string>', 'A strong initial password')
  .requiredOption('--ispName <string>', 'Name of the ISP')
  .requiredOption('--ownerName <string>', 'Name of the ISP owner')
  .parse(process.argv);

const options = program.opts();

async function main() {
  console.log('--- Running Secure Admin Creation Script ---');
  try {
    const userRecord = await admin.auth().createUser({
      email: options.email,
      password: options.password,
      displayName: options.ownerName,
    });
    console.log(`✓ Firebase user created: ${userRecord.uid}`);

    const newAdmin = await prisma.ispAdmin.create({
      data: {
        ownerEmail: options.email,
        firebaseUid: userRecord.uid,
        ispName: options.ispName,
        ownerName: options.ownerName,
      },
    });
    console.log('✓ Database record created.');
    console.log('\n✅ Success! New Admin Details:');
    console.log(newAdmin);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
    console.log('--- Script Finished ---');
  }
}

main();