import { Request, Response, NextFunction } from 'express';
import colors from 'colors';

// Import Models
import Role from '../models/Role';
import AccountStatus, { IAccount } from '../models/AccountStatus';
import Month, { IMonth } from '../models/Month';

// IMPORT DATA
import {
  ROLEDATA,
  COUNTRIESDATA,
  MONTHDATA,
  ACCOUNTSTATUSDATA,
} from '../data/masterData';

const createMasterData = async () => {
  try {
    console.log(
      '👋️ ' +
        colors.green.bold.underline('Hang On... Creating Master Data !!!')
    );

    const role: any = await Role.findOne({});
    if (!role) {
      let tempRole: any = [];

      ROLEDATA.forEach((item) => tempRole.push({ value: item }));
      await Role.insertMany(tempRole);
    }

    const accountStatus: any = await AccountStatus.findOne({});
    if (!accountStatus) {
      let tempAccountStatus: any = [];

      ACCOUNTSTATUSDATA.forEach((item) =>
        tempAccountStatus.push({ value: item })
      );
      await AccountStatus.insertMany(tempAccountStatus);
    }

    const month: any = await Month.findOne({});
    if (!month) {
      let tempMonth: any = [];

      MONTHDATA.forEach((item) => tempMonth.push({ value: item }));
      await Month.insertMany(tempMonth);
    }
  } catch (err) {
    console.error(err);
  }
};

export default createMasterData;
