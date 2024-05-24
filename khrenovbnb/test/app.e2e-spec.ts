import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RoomDto } from '../src/room/dto/room.dto';
import { disconnect, Types } from 'mongoose';
const testRoomDto: RoomDto = {
  typeRoom: 'Стандарт',
  advantagesRoom: 'Чистая',
  squareRoom: '30',
  isActive: true,
};
const dateBooking: Date = new Date();
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdRoomId: string;
  let createScheduleId;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('room/create (POST) - Success', async () => {
    return request(app.getHttpServer())
      .post('/room/create')
      .send(testRoomDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdRoomId = body._id;
        expect(createdRoomId).toBeDefined();
      });
  });
  it('schedule/create (POST) - Success', async () => {
    const testScheduleDto = {
      idRoom: createdRoomId,
      dateBooking: dateBooking,
    };
    return request(app.getHttpServer())
      .post('/schedule/create')
      .send(testScheduleDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createScheduleId = body._id;
        expect(createScheduleId).toBeDefined();
      });
  });
  it('schedule/create (POST) - Failed', async () => {
    return request(app.getHttpServer())
      .post('/schedule/create')
      .send({
        idRoom: new Types.ObjectId().toHexString(),
        dateBooking:
          'Wed July 29 2024 17:21:08 GMT+0300 (Москва, стандартное время)',
      })
      .expect(404)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });
  it('room/item/:id (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/room/item/${createdRoomId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect([body].length).toBe(1);
      });
  });
  it('schedule/item/:id (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/schedule/item/${createScheduleId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect([body].length).toBe(1);
      });
  });
  it('schedule/item/:id (GET) - failed', async () => {
    return request(app.getHttpServer())
      .get(`/schedule/item/${new Types.ObjectId().toHexString()}`)
      .expect(404);
  });
  it('room/item/:id (GET) - failed', () => {
    return request(app.getHttpServer())
      .get(`/room/item/${new Types.ObjectId().toHexString()}`)
      .expect(404);
  });
  it('room/all/ (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/room/all`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });
  it('schedule/all/ (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/schedule/all`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });
  it('room/update/:id (GET) - success', async () => {
    return request(app.getHttpServer())
      .patch(`/room/update/${createdRoomId}`)
      .send({
        typeRoom: 'Люкс',
        advantagesRoom: 'Вид на море',
        squareRoom: '323',
      })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });
  it(`room/:id (DELETE) - success`, () => {
    return request(app.getHttpServer())
      .delete(`/room/${createdRoomId}`)
      .expect(200);
  });
  it(`schedule/:id (DELETE) - success`, () => {
    return request(app.getHttpServer())
      .delete(`/schedule/${createScheduleId}`)
      .expect(200);
  });
  afterAll(() => {
    disconnect();
  });
});
