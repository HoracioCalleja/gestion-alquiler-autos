const createTestCar = require('./createFakeCar');
const CarController = require('../autoController');
const CarIdNotDefinedError = require('../../errors/carIdNotDefinedError');

const serviceMock = {
  save: jest.fn(),
  getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestCar(id + 1))),
  getById: jest.fn((id) => createTestCar(id)),
  delete: jest.fn(),
  getAvailableCars: jest.fn(() => Array.from({ length: 3 }, (id) => createTestCar(id + 1))),
  getPrecioUnitario: jest.fn(() => 2500),
};

const reqMock = {
  params: {
    id: 1,
  },
  session: {
    messages: [],
    errors: [],
  },
};

const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const mockController = new CarController(serviceMock);

describe('Car Controller methods', () => {
  afterEach(() => {
    Object.values(serviceMock).forEach((mockFunc) => mockFunc.mockClear());
    Object.values(resMock).forEach((mockFunc) => mockFunc.mockClear());
  });

  test('Configures routes for every metehod', () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    };
    mockController.configureRoutes(app);
    expect(app.get).toHaveBeenCalled();
    expect(app.post).toHaveBeenCalled();
  });

  test('Index renders index.html with all cars data', async () => {
    const autos = serviceMock.getAll();
    const { errors, messages } = reqMock.session;
    await mockController.index(reqMock, resMock);

    expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(errors).toHaveLength(0);
    expect(messages).toHaveLength(0);
    expect(resMock.render).toHaveBeenCalledWith('auto/View/index.html', {
      data: {
        autos,
        errors,
        messages,
      },
    });
  });

  test('View renders a specific car by ID', async () => {
    const auto = serviceMock.getById(1);
    const { errors, messages } = reqMock.session;
    await mockController.view(reqMock, resMock);

    expect(errors).toHaveLength(0);
    expect(messages).toHaveLength(0);
    expect(serviceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('auto/View/form.njk', {
      data: {
        auto,
      },
    });
  });

  test('View fails at undefined car ID', async () => {
    const reqWithUndefinedId = {
      session: {
        errors: [],
        messages: [],
      },
    };
    await mockController.view(reqWithUndefinedId, resMock);
    const { errors } = reqWithUndefinedId.session;
    expect(errors).toHaveLength(2);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/auto');
  });
});
