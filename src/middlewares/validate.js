module.exports = (schema,viewName) => (req,res,next)=>{
    const { error, value } = schema.validate(req.body);
    if(error){
        const errors = error.details.map((err)=>err.message);
        req.flash('success',`error`);
        console.log(req);
        return res.render(viewName,{
            errors,
            formData:value
        });
    }
    req.validatedData = value;
    next();
}