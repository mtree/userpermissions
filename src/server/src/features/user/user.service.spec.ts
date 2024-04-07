import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserGroup } from '../user-group/user-group.entity';
import { Permission } from '../permission/permission.entity';
import { UpsertUserDto } from './dto/upsert-user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: any;
  let userGroupRepository: any;
  let permissionRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserGroup),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn()
          },
        },
        {
          provide: getRepositoryToken(Permission),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
    userGroupRepository = module.get(getRepositoryToken(UserGroup));
    permissionRepository = module.get(getRepositoryToken(Permission));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: '1', name: 'John Doe', userGroups: [], permissions: [], negativePermissions: [] },
        { id: '2', name: 'Jane Smith', userGroups: [], permissions: [], negativePermissions: []},
        { id: '3', name: 'Alice Johnson', userGroups: [], permissions: [], negativePermissions: []},
      ];
      userRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('find', () => {
    it('should return a user by id', async () => {
      const userId = '1';
      const user: User = {
        id: userId,
        name: 'John Doe',
        userGroups: [],
        permissions: [],
        negativePermissions: [],
      };
      userRepository.findOne.mockResolvedValue(user);

      const result = await service.find(userId);

      expect(result).toEqual(user);
    });
  });

  describe('upsert', () => {
    it('should upsert a user', async () => {
      const upsertUserDto: UpsertUserDto = {
        id: '1',
        name: 'John Doe',
        userGroups: [
          { id: '1', name: 'Group 1', permissions: [], negativePermissions: [] },
          { id: '2', name: 'Group 2', permissions: [], negativePermissions: [] },
        ],
        permissions: [
          { id: '1', name: 'Permission 1' },
          { id: '2', name: 'Permission 2' },
        ],
        negativePermissions: [
          { id: '3', name: 'Permission 3' },
          { id: '4', name: 'Permission 4' },
        ],
      };
      const user: User = {
        id: '1',
        name: 'John Doe',
        userGroups: [
          { id: '1', name: 'Group 1', permissions: [], negativePermissions: [] },
          { id: '2', name: 'Group 2', permissions: [], negativePermissions: [] },
        ],
        permissions: [
          { id: '1', name: 'Permission 1' },
          { id: '2', name: 'Permission 2' },
        ],
        negativePermissions: [
          { id: '3', name: 'Permission 3' },
          { id: '4', name: 'Permission 4' },
        ],
      };

      userRepository.save.mockResolvedValue(user);

      const result = await service.upsert(upsertUserDto);

      expect(result).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const userId = '1';
      userRepository.delete.mockResolvedValue({});

      const result = await service.delete(userId);

      expect(result).toEqual({});
    });
  });
});
