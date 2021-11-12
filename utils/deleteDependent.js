let Test_01 = require('../model/Test_01');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteTest_01 = async (filter) =>{
  try {
    return await Test_01.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const Test_01Filter4966 = { 'addedBy': { '$in': user } };
      const Test_015942 = await deleteTest_01(Test_01Filter4966);
      const Test_01Filter4056 = { 'updatedBy': { '$in': user } };
      const Test_013090 = await deleteTest_01(Test_01Filter4056);
      const userFilter8497 = { 'addedBy': { '$in': user } };
      const user1513 = await deleteUser(userFilter8497);
      const userFilter7564 = { 'updatedBy': { '$in': user } };
      const user4632 = await deleteUser(userFilter7564);
      const userTokensFilter5484 = { 'userId': { '$in': user } };
      const userTokens8860 = await deleteUserTokens(userTokensFilter5484);
      const userRoleFilter7871 = { 'userId': { '$in': user } };
      const userRole3636 = await deleteUserRole(userRoleFilter7871);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter6916 = { 'roleId': { '$in': role } };
      const routeRole2995 = await deleteRouteRole(routeRoleFilter6916);
      const userRoleFilter5440 = { 'roleId': { '$in': role } };
      const userRole2926 = await deleteUserRole(userRoleFilter5440);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter9939 = { 'routeId': { '$in': projectroute } };
      const routeRole4638 = await deleteRouteRole(routeRoleFilter9939);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countTest_01 = async (filter) =>{
  try {
    const Test_01Cnt =  await Test_01.countDocuments(filter);
    return { Test_01 : Test_01Cnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const Test_01Filter3945 = { 'addedBy': { '$in': user } };
      const Test_013881Cnt = await countTest_01(Test_01Filter3945);
      const Test_01Filter0243 = { 'updatedBy': { '$in': user } };
      const Test_015103Cnt = await countTest_01(Test_01Filter0243);
      const userFilter0513 = { 'addedBy': { '$in': user } };
      const user5677Cnt = await countUser(userFilter0513);
      const userFilter6479 = { 'updatedBy': { '$in': user } };
      const user4564Cnt = await countUser(userFilter6479);
      const userTokensFilter7663 = { 'userId': { '$in': user } };
      const userTokens9421Cnt = await countUserTokens(userTokensFilter7663);
      const userRoleFilter4455 = { 'userId': { '$in': user } };
      const userRole6897Cnt = await countUserRole(userRoleFilter4455);
      const userCnt =  await User.countDocuments(filter);
      let response = { user : userCnt  };
      response = {
        ...response,
        ...Test_013881Cnt,
        ...Test_015103Cnt,
        ...user5677Cnt,
        ...user4564Cnt,
        ...userTokens9421Cnt,
        ...userRole6897Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter3178 = { 'roleId': { '$in': role } };
      const routeRole4794Cnt = await countRouteRole(routeRoleFilter3178);
      const userRoleFilter9095 = { 'roleId': { '$in': role } };
      const userRole2431Cnt = await countUserRole(userRoleFilter9095);
      const roleCnt =  await Role.countDocuments(filter);
      let response = { role : roleCnt  };
      response = {
        ...response,
        ...routeRole4794Cnt,
        ...userRole2431Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter1971 = { 'routeId': { '$in': projectroute } };
      const routeRole4240Cnt = await countRouteRole(routeRoleFilter1971);
      const projectRouteCnt =  await ProjectRoute.countDocuments(filter);
      let response = { projectRoute : projectRouteCnt  };
      response = {
        ...response,
        ...routeRole4240Cnt,
      };
      return response;
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTest_01 = async (filter,loggedInUser) =>{
  try {
    if (loggedInUser && loggedInUser.id)
      return await Test_01.updateMany(filter, {
        isDeleted:true,
        updatedBy:loggedInUser.id
      });
    else
      return await Test_01.updateMany(filter,{ isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,loggedInUser) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const Test_01Filter8586 = { 'addedBy': { '$in': user } };
      const Test_014594 = await softDeleteTest_01(Test_01Filter8586);
      const Test_01Filter1967 = { 'updatedBy': { '$in': user } };
      const Test_018641 = await softDeleteTest_01(Test_01Filter1967);
      const userFilter9163 = { 'addedBy': { '$in': user } };
      const user4509 = await softDeleteUser(userFilter9163);
      const userFilter6168 = { 'updatedBy': { '$in': user } };
      const user3594 = await softDeleteUser(userFilter6168);
      const userTokensFilter4349 = { 'userId': { '$in': user } };
      const userTokens8454 = await softDeleteUserTokens(userTokensFilter4349);
      const userRoleFilter6392 = { 'userId': { '$in': user } };
      const userRole2976 = await softDeleteUserRole(userRoleFilter6392);
      if (loggedInUser && loggedInUser.id)
        return await User.updateMany(filter, {
          isDeleted:true,
          updatedBy:loggedInUser.id
        });
      else
        return await User.updateMany(filter,{ isDeleted:true });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,loggedInUser) =>{
  try {
    if (loggedInUser && loggedInUser.id)
      return await UserTokens.updateMany(filter, {
        isDeleted:true,
        updatedBy:loggedInUser.id
      });
    else
      return await UserTokens.updateMany(filter,{ isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,loggedInUser) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter6142 = { 'roleId': { '$in': role } };
      const routeRole6635 = await softDeleteRouteRole(routeRoleFilter6142);
      const userRoleFilter6274 = { 'roleId': { '$in': role } };
      const userRole8473 = await softDeleteUserRole(userRoleFilter6274);
      if (loggedInUser && loggedInUser.id)
        return await Role.updateMany(filter, {
          isDeleted:true,
          updatedBy:loggedInUser.id
        });
      else
        return await Role.updateMany(filter,{ isDeleted:true });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,loggedInUser) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter5646 = { 'routeId': { '$in': projectroute } };
      const routeRole9117 = await softDeleteRouteRole(routeRoleFilter5646);
      if (loggedInUser && loggedInUser.id)
        return await ProjectRoute.updateMany(filter, {
          isDeleted:true,
          updatedBy:loggedInUser.id
        });
      else
        return await ProjectRoute.updateMany(filter,{ isDeleted:true });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,loggedInUser) =>{
  try {
    if (loggedInUser && loggedInUser.id)
      return await RouteRole.updateMany(filter, {
        isDeleted:true,
        updatedBy:loggedInUser.id
      });
    else
      return await RouteRole.updateMany(filter,{ isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,loggedInUser) =>{
  try {
    if (loggedInUser && loggedInUser.id)
      return await UserRole.updateMany(filter, {
        isDeleted:true,
        updatedBy:loggedInUser.id
      });
    else
      return await UserRole.updateMany(filter,{ isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteTest_01,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countTest_01,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteTest_01,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
