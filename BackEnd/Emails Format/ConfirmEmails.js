exports.RestPasswordFormatEmail = (LinkRest) => {
return `
<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <img width="200" src="http://localhost:3000/MainImage/Logo.png" title="logo" alt="logo">
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${LinkRest}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>mena_afefe3000@yahoo</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
`}
exports.ActivationFormatEmail = (UserName , id) => {
    return `
    <h1 style="text-align:center; color: #008000">Welcome In E-Learning</h1>
    <hr>
    <div style="margin-left: 15px;margin-right: 15px; text-align:left;">
    <h1 style="font-family:courier; color: #002080">Greetings from the engineer 
    <div style="font-family:verdana; margin-left: 28vw">Mena Afefe Fawze</div> </h1>
    <br>
    <h2 style="color: #000080;">To Do Login You Need To save This UserName </h2> 
    <h2 style="color: #000080;">Your UserName : - ${UserName}</h2>
    <h2 style="color: #000080;">Your ID : - ${id}</h2>
    <div style="color:#400080; text-align:center;">
    <p>If You have any problem You can call me via Phone Or email But Please To Easy Help
     You Must Save Your Id and Your User-name to help me can solve any problem for you in easy ThankYou 
     and I will Leave All My Content In Below</p>
     <h3>Phone :- +201022448327</h3>
     <h3>Email :- mena_afefe3000@yahoo.com</h3>
    </div>
    <h3 style="color:#400080;">best wishes!</h4>
    </div>
  `
}