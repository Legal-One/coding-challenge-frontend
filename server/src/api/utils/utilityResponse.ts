import { Response } from 'express';
import { IDashboardResponse, IAgentResponse } from '../controllers/types';

type UtilityResponseType = {
	res: Response;
	data?: IDashboardResponse[] | IAgentResponse | null;
	message: string;
	statusCode: number;
};

const utilityResponse = ({
	res,
	data = null,
	message,
	statusCode,
}: UtilityResponseType): Response<unknown, Record<string, unknown>> =>
	res.status(statusCode).json({
		data,
		message,
		status: statusCode === 400 || statusCode === 500 ? 'ERROR' : 'SUCCESS',
	});

export default utilityResponse;
