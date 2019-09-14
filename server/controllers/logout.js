exports.logout = (req,res)=>{
    res.clearCookie('access');
    res.redirect('/');
}