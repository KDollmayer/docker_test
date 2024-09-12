import db from '../../src/utils/db';

const run = async () => {
  await db.message.createMany({
    data: [
      { content: 'Content A', sender: 'Sender A', reciver: 'Reciver A' },
      { content: 'Content B', sender: 'Sender B', reciver: 'Reciver B' },
      { content: 'Content C', sender: 'Sender C', reciver: 'Reciver C' },
      {
        content: 'Content D',
        sender: 'Sender D',
        reciver: 'Reciver D',
        deleted: false,
      },
      {
        content: 'Content E',
        sender: 'Sender E',
        reciver: 'Reciver E',
        read: true,
      },
    ],
  });
};

if (require.main === module) {
  run().then(() => {
    console.log('Data seeded successfully');
    process.exit();
  });
}
