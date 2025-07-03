import { Midia } from 'src/media/models/entity/midia.entity';
import { FindMidiaController } from './find-media.controller';
import { FindMidiaUseCase } from './find-media.use-case';
import { NotAcceptableException } from '@nestjs/common';

describe('FindMidiaController', () => {
  let controller: FindMidiaController;
  let mockUseCase: jest.Mocked<FindMidiaUseCase>;

  beforeEach(() => {
    mockUseCase = {
      find: jest.fn(),
    } as any;

    controller = new FindMidiaController(mockUseCase);
  });

  it('deve retornar a mídia ao receber um ID válido', async () => {
    const midia: Midia = {
      id: 1,
      name: 'foto.png',
      icon: false,
      createdAt: new Date(),
      product: null,
      url: 'midias/foto.png',
    } as Midia;

    mockUseCase.find.mockResolvedValue(midia);

    const result = await controller.find(1);

    expect(mockUseCase.find).toHaveBeenCalledWith(1);
    expect(result).toEqual(midia);
  });

  it('deve lançar NotAcceptableException se o ID for inválido', async () => {
    await expect(controller.find('abc' as any)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockUseCase.find).not.toHaveBeenCalled();
  });
});
