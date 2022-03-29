import { Test, TestingModule } from '@nestjs/testing';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

describe('ReviewController unit test', () => {
  let controller: ReviewController;
  let spyService: ReviewService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ReviewService,
      useFactory: () => ({
        saveReview: jest.fn(() => []),
        findAllReviews: jest.fn(() => []),
        findOneReview: jest.fn(() => {}),
      })
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService, ApiServiceProvider],
    }).compile();

    controller = app.get<ReviewController>(ReviewController);
    spyService = app.get<ReviewService>(ReviewService);
  })
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [ReviewController],
  //   }).compile();

  //   controller = module.get<ReviewController>(ReviewController);
  // });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create review method', () => {
    const dto = new CreateReviewDto()
    expect(controller.create(dto)).not.toEqual(null)
  })

  it('create review method', () => {
    const dto = new CreateReviewDto()
    controller.create(dto)
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  })

  it('getOne method', () => {
    const id = 1
    controller.getOne(id)
    expect(spyService.getOne).toHaveBeenCalled()
  })

  it('get all reviws', () => {
    controller.getAll();
    expect(spyService.getAll).toHaveBeenCalled()
  })
});
