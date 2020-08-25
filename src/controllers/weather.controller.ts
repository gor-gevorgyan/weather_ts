'use strict';

import { Controller, GET } from 'fastify-decorators';
import {FastifyReply, FastifyRequest} from "fastify";
import {OpenWeatherApi} from "../classes/open-weather-api";
import {AxiosResponse} from "axios";
import {User} from "../entity/User";
import {History} from "../entity/History";
import {createConnection} from "typeorm";
import moment from "moment";
import {DefaultObject} from "../interfaces/global";

@Controller('/')
export default class WeatherController {
    @GET('/:cityname')
    async getByCityName(request: FastifyRequest, reply: FastifyReply) {
        let params: any = request.params;

        if (params.cityname.length === 0) {
            reply.callNotFound();
        }

        const repository = await createConnection();
        let user = repository.getRepository(User);

        let user_data = await user.findOne({
            where: {
                ip: request.ip
            }
        });

        let date = moment();

        if (typeof user_data == "undefined") {
            user_data = new User();

            user_data.created_at = date.format('YYYY-MM-DD HH:mm:ss');
            user_data.ip = request.ip;

            user_data = await user.save(user_data);
        }

        let city_exists: boolean = false;
        let city_data: DefaultObject = {};
        let historyRepository = repository.getRepository(History);

        let history: History[] | [] = await historyRepository.find({
            where: {
                user_id: user_data.id
            },
            order: {
                id: "DESC"
            }
        });

        try {
            let weatherAPI = new OpenWeatherApi();

            let data: AxiosResponse = await weatherAPI.get({
                q: params.cityname,
                units: "metric"
            });

            city_exists = true;
            city_data = data.data;

            let history_data = new History();

            history_data.user_id = user_data.id;
            history_data.data = data.data;
            history_data.created_at = date.format('YYYY-MM-DD HH:mm:ss');

            await historyRepository.save(history_data);
        } catch (e) {
        }

        return reply.view('city', {
            city_exists,
            city_data,
            history,
            city_name: params.cityname,
        });
    }
}