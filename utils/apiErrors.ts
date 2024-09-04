class APIErrors extends Error{
  private status:string;

  constructor( message: string, private statusCode: number ){
    super(message);
    this.status = `${this.statusCode}`[0] === '4'? "Failed!": "Server Error!";
  };
};

export default APIErrors;