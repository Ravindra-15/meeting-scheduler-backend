import { Op } from "sequelize";
import { Meeting } from "../module/meeting.model";

export class MeetingService {

  static async createMeeting(data: any) {
    if (data.startTime >= data.endTime) {
      throw new Error("Start time must be before end time");
    }

    const conflict = await Meeting.findOne({
      where: {
        userId: data.userId,
        startTime: { [Op.lt]: data.endTime },
        endTime: { [Op.gt]: data.startTime }
      }
    });

    if (conflict) {
      throw new Error("Time slot already booked");
    }

    return await Meeting.create(data);
  }

  static async updateMeeting(id: number, data: any) {
    const meeting = await Meeting.findByPk(id);
    if (!meeting) throw new Error("Meeting not found");

    const conflict = await Meeting.findOne({
      where: {
        userId: meeting.getDataValue("userId"),
        id: { [Op.ne]: id },
        startTime: { [Op.lt]: data.endTime },
        endTime: { [Op.gt]: data.startTime }
      }
    });

    if (conflict) {
      throw new Error("Time slot already booked");
    }

    await meeting.update(data);
    return meeting;
  }

 static async getMeetings(filters: any) {
  const where: any = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.startDate && filters.endDate) {
    const start = new Date(filters.startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(filters.endDate);
    end.setHours(23, 59, 59, 999);

    where.startTime = {
      [Op.between]: [start, end]
    };
  }

  // Pagination logic
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const offset = (page - 1) * limit;

  const { rows, count } = await Meeting.findAndCountAll({
    where,
    limit,
    offset,
    order: [["startTime", "ASC"]]
  });

  return {
    totalRecords: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    meetings: rows
  };
}

  static async deleteMeeting(id: number) {
    const meeting = await Meeting.findByPk(id);
    if (!meeting) throw new Error("Meeting not found");
    await meeting.destroy();
  }
}