import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const initialSeed = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  // Check if admin user already exists
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@almizan.com' }
  });

  if (!existingAdmin) {
    // Create admin user
    const adminUser = new User();
    adminUser.firstName = 'Admin';
    adminUser.lastName = 'User';
    adminUser.email = 'admin@almizan.com';
    adminUser.password = await bcrypt.hash('Admin123!', 10);
    adminUser.roles = ['admin'];
    adminUser.isActive = true;

    await userRepository.save(adminUser);
    console.log('Admin user created successfully');
  }
};
