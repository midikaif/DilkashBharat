module.exports = (schema,viewName) => (req,res,next)=>{

    const { error, value } = schema.validate(req.body);
    console.log("in validation", schema.validate(req.body));
    if(error){
        console.log('in error')
        console.log(req);
        const errors = error.details.map((err)=>err.message);


        return res.render(viewName,{
            errors,
            formData:value
        });
    }
    req.validatedData = value;
    next();
}