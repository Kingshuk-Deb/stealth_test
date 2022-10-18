import { PrismaClient } from '@prisma/client';
import { User } from './schema';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

const createData = async (data: User) => {
  try {
    data.password = await argon2.hash(data.password);
    const user: User = await prisma.user.create({
      data: data
    });
    delete user.password;
    return {
      success: true,
      user
    };
  } catch (err) {
    const error = err.message;
    return {
      success: false,
      error
    };
  }
};

const getData = async (userId: number) => {
  try {
    const user: any = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        movies: true
      }
    });
    delete user.password;
    if (user) {
      return {
        success: true,
        user
      };
    }
    return {
      success: false,
      error: `User by id: ${userId} doesn't exist.`
    };
  } catch (err) {
    const error = err.message;
    return {
      success: false,
      error
    };
  }
};

const doesEmailExist = async (email: string) => {
  try {
    const user: any = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (user) {
      return {
        success: true,
        exists: true
      };
    }
    return {
      success: true,
      exists: false
    };
  } catch (err) {
    const error = err.message;
    return {
      success: false,
      error
    };
  }
};

const getDataOnLogin = async (data: User) => {
  try {
    const user: any = await prisma.user.findUnique({
      where: {
        email: data.email
      },
      include: {
        movies: true
      }
    });
    if (user) {
      if (await argon2.verify(user.password, data.password)) {
        delete user.password;
        return {
          success: true,
          user
        };
      }
      return {
        success: false,
        error: `Password doesn't match for user with email: ${data.email}.`
      };
    }
    return {
      success: false,
      error: `User by email: ${data.email} doesn't exist.`
    };
  } catch (err) {
    const error = err.message;
    return {
      success: false,
      error
    };
  }
};

export = {
  createData,
  getData,
  doesEmailExist,
  getDataOnLogin
};
