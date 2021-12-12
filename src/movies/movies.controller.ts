import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll() : Movie[] {
        return this.moviesService.getAll();
    }

    // GET보다 아래 있으면, search를 id로 판단하는 문제가 있음.
    @Get("/search")
    search(@Query("year") searchingYear: string){
        return `we are searching for a moview with a title : ${searchingYear}`
    }

    @Get("/:id")
    getOne(@Param("id") movieId: number) : Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData : CreateMovieDTO){
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData : UpdateMovieDTO){
        return this.moviesService.update(movieId, updateData);
    }

 
}
