import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { Model } from "mongoose";
import { FilterData } from "./moreInterfaces/filterData";
import APIErrors from "../utils/apiErrors";
import categoriesModel from "./categories/categoriesModel";
import subcategoryModel from "./subcategory/subcategoryModel";
import Features from "../utils/features";
import model from './users/userModel';

export const getAll = <modelType>( model: Model<any>, modelName:string ) =>
  asyncHandler( async( req:Request, res:Response, next:NextFunction ) => {
    let filterData: any = {};

    if ( req.filterData )
      filterData = req.filterData;

    // const document: modelType[] = await model.find(filterData);
    const features:Features = new Features( model.find( filterData ), req.query ).sort()
    const { mongooseQuery } = features;
    const documents = modelType[] = await mongooseQuery;
    
    if ( !document ) return next( new APIErrors( `The Document [${req.params.id}] not found`, 404 ) );
    res.status(200).json( {data:document} );
  })

export const getOne = <modelType>( model: Model<any> ) =>
  asyncHandler( async( req:Request, res:Response, next:NextFunction) =>{
    const document: modelType | null = await model.findById(req.params.id);
    if ( !document ) return next( new APIErrors( `The Document [${req.params.id}] not found`, 404 ) );

    res.status(200).json( {data:document} );
  })

export const POST = <modelType>( model: Model<any> ) =>
  asyncHandler( async( req:Request, res:Response, next:NextFunction ) =>{
    const document: modelType = await model.create(req.body);
    res.status(201).json( {data: document} );
  })

export const PUT = <modelType>( model:Model<any> ) =>
  asyncHandler( async( req:Request, res:Response, next:NextFunction ) =>{
    const document: modelType | null = await model.findByIdAndUpdate( req.params.id, req.body, { new: true } );
    if ( !document ) return next( new APIErrors( `The Document [${req.params.id}] not found`, 404 ) );
    res.status(200).json( {data:document} );
  })

export const DELETE = <modelType>( model:Model<any> ) =>
  asyncHandler( async( req:Request, res:Response, next:NextFunction ) => {
    const document: modelType | null = await model.findByIdAndDelete( req.params.id );
    if ( !document ) return next( new APIErrors( `The Document [${req.params.id}] not found`, 404 ) );
    if ( model == categoriesModel )
      await subcategoryModel.deleteMany({ category: req.params.id });

    res.status(204).json()
  })
