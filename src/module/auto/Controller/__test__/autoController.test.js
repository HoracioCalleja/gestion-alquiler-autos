const createFakeCar = require('./createFakeCar');
const CarController = require('../autoController');
const { fromDataToEntity } = require('../../Maper/autoMapper');
const CarIdNotDefinedError = require('../../errors/carIdNotDefinedError');

const serviceMock = {
  save: jest.fn(),
  getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createFakeCar(id + 1))),
  getById: jest.fn((id) => {
    return createFakeCar(id);
  }),
  delete: jest.fn(),
  getAvailableCars: jest.fn(() => Array.from({ length: 3 }, (id) => createFakeCar(id + 1))),
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

  test(' index renders index.html with all cars data', async () => {
    const autos = serviceMock.getAll();
    const { errors, messages } = reqMock.session;
    await mockController.index(reqMock, resMock);

    expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(errors).toHaveLength(0);
    expect(messages).toHaveLength(0);
    expect(resMock.render).toHaveBeenCalledWith('auto/View/index.html', {
      data: {
        title: 'Lista de autos',
        autos,
        errors,
        messages,
      },
    });
  });

  test(' view renders a specific car by ID ', async () => {
    const auto = serviceMock.getById(1);
    const { errors, messages } = reqMock.session;
    await mockController.view(reqMock, resMock);

    expect(errors).toHaveLength(0);
    expect(messages).toHaveLength(0);
    expect(serviceMock.getById).toHaveBeenCalledTimes(2);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('auto/View/form.njk', {
      data: {
        title: 'Viendo el auto marca Pegueot - modelo Mock 2017 - año 2018',
        auto,
      },
    });
  });

  test(' view redirects to /auto with errors messages at null car ID ', async () => {
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

  test(' create renders a form to create a car ', () => {
    mockController.create(reqMock, resMock);
    expect(resMock.render).toHaveBeenCalledTimes(1);
    expect(resMock.render).toHaveBeenCalledWith('auto/View/form.njk', {
      data: {
        title: 'Crear auto',
      },
    });
  });

  test(' save should save a car', async () => {
    const reqMockWithBody = {
      body: {
        id: 1,
        marca: 'Pegueot',
        modelo: 'Mock 2017',
        anio: 2018,
        kms: 3500,
        color: 'Negro',
        pasajeros: 4,
        esAutomatico: 'SI',
        aireAcondicionado: 'SI',
        activo: 'SI',
        rentado: 'NO',
        'precio-dia': 2500,
      },
      session: { ...reqMock.session },
    };
    await mockController.save(reqMockWithBody, resMock);

    const { messages, errors } = reqMockWithBody.session;
    const auto = fromDataToEntity(reqMockWithBody.body);
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(auto);
    expect(messages).toHaveLength(1);
    expect(errors).toHaveLength(0);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/auto');
  });

  test('save should fail at invalid auto data and redirect to /auto with error messages', async () => {
    const reqMockWithInvalidBody = {
      body: {},
      session: { ...reqMock.session },
    };

    await mockController.save(reqMockWithInvalidBody, resMock);

    const invalidAuto = fromDataToEntity(reqMockWithInvalidBody.body);
    const { errors, messages } = reqMockWithInvalidBody.session;
    expect(serviceMock.save).toHaveBeenCalledTimes(1);
    expect(serviceMock.save).toHaveBeenCalledWith(invalidAuto);
    expect(errors).toHaveLength(2);
    expect(messages).toHaveLength(0);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/auto');
  });

  test('delete should delete a Car at a given ID', async () => {
    await mockController.delete(reqMock, resMock);
    const auto = serviceMock.getById(1);
    const { errors, messages } = reqMock.session;

    expect(serviceMock.getById).toHaveBeenCalledTimes(2);
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
    expect(serviceMock.delete).toHaveBeenCalledWith(auto);
    expect(errors).toHaveLength(0);
    expect(messages).toHaveLength(1);
    expect(resMock.redirect).toHaveBeenCalledTimes(1);
    expect(resMock.redirect).toHaveBeenCalledWith('/auto');
  });

});
