const Test_01 = require('../../model/Test_01');
const Test_01SchemaKey = require('../../utils/validation/Test_01Validation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
    
const addTest_01 = async (req, res) => {
  try {
    let validateRequest = validation.validateParamsWithJoi(
      req.body,
      Test_01SchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    let data = new Test_01({
      ...req.body
      ,addedBy:req.user.id
    });
    let result = await dbService.createDocument(Test_01,data);
    return  res.ok({ data : result });
  } catch (error) {
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    if (error.code && error.code == 11000){
      return res.isDuplicate();
    }
    return res.failureResponse(); 
  }
};
    
const findAllTest_01 = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let result;
    if (req.body.query !== undefined) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      result = await dbService.countDocument(Test_01, query);
      if (result) {
        result = { totalRecords: result };
        return res.ok({ data :result });
      } 
      return res.recordNotFound();
    }
    else {
      if (req.body.options !== undefined) {
        /*
         * if(req.body.options.populate){
         *   delete req.body.options.populate;
         * }
         */
        options = { ...req.body.options };
      }
      result = await dbService.getAllDocuments( Test_01,query,options);
      if (result && result.data && result.data.length){
        return res.ok({ data :result });   
      }
      return res.recordNotFound();
    }
  }
  catch (error){
    return res.failureResponse();
  }
};
    
const getTest_01Count = async (req,res) => {
  try {
    let where = {};
    if (req.body.where){
      where = req.body.where;
    }
    let result = await dbService.countDocument(Test_01,where);
    if (result){
      result = { totalRecords:result };
      return res.ok({ data :result });
    }
    return res.recordNotFound();
  }
  catch (error){
    return res.failureResponse();
  }
};

const getTest_01ByAggregate = async (req,res)=>{
  try {
    let result = await dbService.getDocumentByAggregation(Test_01,req.body);
    if (result){
      return res.ok({ data :result });
    }
    return res.recordNotFound();
  } catch (error){
    return res.failureResponse(error.message);
  }
};

const softDeleteManyTest_01 = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (ids){
      const query = { _id:{ $in:ids } };
      let data = await dbService.bulkUpdate(Test_01,query, {
        isDeleted: true,
        updatedBy:req.user.id
      });
      if (!data) {
        return res.recordNotFound();
      }
      return res.ok({ data:data });
    }
    return res.badRequest();
  } catch (error){
    return res.failureResponse(); 
  }
};

const bulkInsertTest_01 = async (req,res)=>{
  try {
    let data;   
    if (req.body.data !== undefined && req.body.data.length){
      data = req.body.data;
      for (let i = 0;i < data.length;i++){
        Object.assign(data[i],{ addedBy:req.user.id });
      }
      let result = await dbService.bulkInsert(Test_01,data);
      return  res.ok({ data :result });
    } else {
      return res.badRequest();
    }  
  } catch (error){
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    else if (error.code && error.code == 11000){
      return res.isDuplicate();
    }
    return res.failureResponse();
  }
};

const bulkUpdateTest_01 = async (req,res)=>{
  try {
    let filter = {};
    let data;
    if (req.body.filter !== undefined){
      filter = req.body.filter;
    }
    if (req.body.data !== undefined){
      data = { ...req.body.data };
      delete data['addedBy'];
      delete data['updatedBy'];
      data.updatedBy = req.user.id;
      let result = await dbService.bulkUpdate(Test_01,filter,data);
      if (!result){
        return res.recordNotFound();
      }
      return  res.ok({ data :result });
    }
    else {
      return res.badRequest();
    }
  }
  catch (error){
    return res.failureResponse(); 
  }
};
const deleteManyTest_01 = async (req, res) => {
  try {
    let ids = req.body.ids; 
    if (ids){
      const query = { '_id':{ '$in':ids } };
      let result = await dbService.deleteMany(Test_01,query);
      return res.ok({ data :result });
    }
    return res.badRequest(); 
  }
  catch (error){
    return res.failureResponse(); 
  }
};

const softDeleteTest_01 = async (req,res) => {
  try {
    let query = { _id:req.params.id };
    let result = await dbService.findOneAndUpdateDocument(Test_01, query,{
      isDeleted: true,
      updatedBy:req.user.id
    },{ new:true });
    if (!result){
      return res.recordNotFound();
    }
    return  res.ok({ data:result });
  } catch (error){
    return res.failureResponse(); 
  }
};
    
const partialUpdateTest_01 = async (req,res) => {
  try {
    delete req.body['addedBy'];
    delete req.body['updatedBy'];
    let data = {
      ...req.body,
      id: req.params.id
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      Test_01SchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let result = await dbService.findOneAndUpdateDocument(Test_01, query, data,{ new:true });
    if (!result) {
      return res.recordNotFound();
    }

    return res.ok({ data:result });
  }
  catch (error){
    return res.failureResponse();
  }
};
    
const updateTest_01 = async (req,res) => {
  try {
    delete req.body['addedBy'];
    delete req.body['updatedBy'];
    let data = {
      ...req.body,
      id:req.params.id
      ,updatedBy:req.user.id
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      Test_01SchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.inValidParam({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = { _id:req.params.id };
    let result = await dbService.findOneAndUpdateDocument(Test_01,query,data,{ new:true });
    if (!result){
      return res.recordNotFound();
    }
    return  res.ok({ data:result });
  }
  catch (error){
    if (error.name === 'ValidationError'){
      return res.validationError({ message : `Invalid Data, Validation Failed at ${ error.message}` });
    }
    else if (error.code && error.code == 11000){
      return res.isDuplicate();
    }
    return res.failureResponse();
  }
};
const getTest_01 = async (req,res) => {
  try {
    let query = {};
    query._id = req.params.id;
    let options = {};
    if (req.body && req.body.populate && req.body.populate.length) options.populate = req.body.populate;
    if (req.body && req.body.select && req.body.select.length) options.select = req.body.select;
    let result = await dbService.getSingleDocument(Test_01,query, options);
    if (result){
            
      return  res.ok({ data :result });
    }
    return res.recordNotFound();
  }
  catch (error){
    return res.failureResponse();
  }
};
const deleteTest_01 = async (req,res) => {
  try {
    let query = { _id:req.params.id };
    const result = await dbService.findOneAndDeleteDocument(Test_01, query);
    if (result){
      return  res.ok({ data :result });
    }
    return res.recordNotFound();
  }
  catch (error){
    return res.failureResponse();
  }
};

module.exports = {
  addTest_01,
  findAllTest_01,
  getTest_01Count,
  getTest_01ByAggregate,
  softDeleteManyTest_01,
  bulkInsertTest_01,
  bulkUpdateTest_01,
  deleteManyTest_01,
  softDeleteTest_01,
  partialUpdateTest_01,
  updateTest_01,
  getTest_01,
  deleteTest_01,
};