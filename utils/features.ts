import { Query } from "mongoose";
import { QueryString, SearchQuery } from "../Apps/moreInterfaces/features";

class Features{
  constructor( public mongooseQuery: Query<any[], any>, private queryString:QueryString ){

  }
  filter(){}

  sort(){
      this.mongooseQuery = (this.queryString.sort)
      ? this.mongooseQuery.sort( this.queryString.sort.split(',').join(' ') ) // if we got sort
      :this.mongooseQuery.sort( '-createdAt' ); // if we don't got
    return this;
  }

  search(){
    if ( this.queryString.search ){
      
    }


  }

  limitFields(){
    if( this.queryString.fields ){
      const fields: string = this.queryString.fields.split(',').join(' ')
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this/
  }

  pagination(){}
}

export default Features;