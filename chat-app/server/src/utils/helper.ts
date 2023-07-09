import { Model } from 'mongoose';
import { ObjectInterface } from 'src/shared/interface/common.interface';

export const responseObject = function (success: boolean, error: boolean, message: string = undefined) {
   return {
      success,
      error,
      message,
   };
};

export async function userAlreadyExists(field: string, value: string, model: Model<any>, options: ObjectInterface): Promise<ObjectInterface> {
   const isExists = await model.findOne({ [field]: value }, options);
   if (isExists) {
      return { exists: true, doc: isExists };
   }
   return { exists: false, doc: null };
}
