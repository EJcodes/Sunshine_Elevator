const express          = require('express');
const clientFeedback   = express.Router();
const Client           = require('../models/client-Info');
const ensureLogin      = require('connect-ensure-login').ensureLoggedIn;


clientFeedback.get('/testimonials/', ensureLogin("/login"), (req, res, next)=>{
    Client.find()
    .then((clientFromDB) => {
        var data = {
            user: req.user,
            client: clientFromDB
        }
        res.render('testimonials', data)
    })
})

clientFeedback.post('/clientFeedback', ensureLogin("/login"),  (req, res, next)=>{
    const reviewer = req.body.reviewer;
    const clientReview = req.body.clientComment;
   

    if (reviewer === "" || clientReview === "") {
    res.render('testimonials', { errorMessage: "Please make sure all fields are filled" });
    return;
}
Client.create({
    reviewer: reviewer,
    myComment: clientReview,
})
    .then((response)=>{
        console.log("this the response after saving comment ==================== ", response)
        res.redirect('/testimonials')
    })
    .catch((error)=>{
        next(error)
    })
});
    // .catch((daError)=>{
    //     next(daError)
    //  })


// reviewRouter.post('/books/:id/reviews/create', (req, res, next)=>{
//     // const theReview = {reviewer: req.body.reviewer, content: req.body.content};
//     // const theReview = req.body;
//                             //first argument is ID of thing you want to find
//      //                        |           second argument is the update you want to run
//      //                        |                            |
//     Book.findByIdAndUpdate(req.params.id,       {$push: {reviews: req.body}})
//     .then((response)=>{

//         res.redirect(`/books/${req.params.id}`)
//     })
//     .catch((err)=>{
//         next(err);
//     })
// });


// reviewRouter.post('/books/:id/reviews/delete/:reviewIndex', (req, res, next)=>{
//     const bookID = req.params.id;
//     const reviewIndex = req.params.reviewIndex;
//     Book.findById(bookID)
//     .then((theBookThatImEditing)=>{
//         theBookThatImEditing.reviews.splice(reviewIndex, 1);
//         // theBookThatImEditing.review[reviewIndex] = {reviewer: "me", content: "waaaahhhhh"}
//         //this ^ would be one way to edit a particular review
//         theBookThatImEditing.save()
//             .then((x)=>{
//                 res.redirect('/books/'+bookID)
//             })
//             .catch((err)=>{
//                 next(err)
//             })
//         })
//     .catch((err)=>{
//         next(err);
//     })

// })











module.exports = clientFeedback;