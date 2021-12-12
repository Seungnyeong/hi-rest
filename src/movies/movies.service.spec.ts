import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe("getAll", () => {
    it("sholud return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne", () => {
    it("sholud return a movie", () => {
      service.create({
        title : "Test Movie",
        genres : ['test'],
        year : 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404 error", () => {
      try{
          service.getOne(999);
      } catch(e) {
          expect(e).toBeInstanceOf(NotFoundException)
          expect(e.message).toEqual('Movie with Id 999 not found.')
      }
    });
  });

  describe("deleteOne", () => {
      it("deletes a movies", () => {
        service.create({
          title : "Test Movie",
          genres : ['test'],
          year : 2000,
        });
        const allMovies = service.getAll().length;
        service.deleteOne(1);
        const afterDelete = service.getAll().length;
        expect(afterDelete).toBeLessThan(allMovies);

      });

      it("should return a 404", () => {
        try{
              service.deleteOne(999)
        } catch(e) {
          expect(e).toBeInstanceOf(NotFoundException)
        }
      });
  });

  describe("create", () => {

    it("sholud create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title : "Test Movie",
        genres : ['test'],
        year : 2000,
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title : "Test Movie",
        genres : ['test'],
        year : 2000,
      });
      service.update(1, {title : "Update Test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Update Test");
    });

    it("should throw a notFoundException", () => {
      try{
            service.update(999, {});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    });
  })
});
