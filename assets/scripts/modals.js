const authEvents = require('./users/events')
const gameEvents = require('./games/events')
const utility = require('./utility')

const signUpModal = () => {
    $('.modal-title').text('Sign Up')
    utility.populateModalBody(`
        <form id="sign-up-form">
            <fieldset>
                <label class="d-block">Email
                    <input class="form-control" name="credentials[email]" type="email" placeholder="email@example.com">
                </label>
                <label class="d-block">Password
                    <input class="form-control" name="credentials[password]" type="password" placeholder="password">
                </label>
                <label class="d-block">Confirm Password
                    <input class="form-control" name="credentials[password_confirmation]" type="password" placeholder="password">
                </label>
                <input class="btn btn-primary mx-auto d-block" type="submit" value="Submit">
            </fieldset>
        </form>
    `)
    $('#sign-up-form').on('submit', authEvents.onSignUp);
}

const signInModal = () => {
    $('.modal-title').text('Sign In')
    utility.populateModalBody(`
    <form id="sign-in-form">
        <fieldset>
            <label class="d-block">Email
                <input class="form-control" name="credentials[email]" type="email" placeholder="email@example.com">
            </label>
            <label class="d-block">Password
                <input class="form-control" name="credentials[password]" type="password" placeholder="password">
            </label>
            <input class="btn btn-primary mx-auto d-block" type="submit" value="Submit">
        </fieldset>
    </form>
    `)
    $('#sign-in-form').on('submit', authEvents.onSignIn);
}

const changePasswordModal = () => {
    $('.modal-title').text('Change Password')
    utility.populateModalBody(`
        <form id="change-password-form">
            <fieldset>
                <label class="d-block">Old Password
                    <input class="form-control" name="passwords[old]" type="password" placeholder="old password">
                </label>
                <label class="d-block">New Password
                    <input class="form-control" name="passwords[new]" type="password" placeholder="new password">
                </label>
                    <input class="btn btn-primary mx-auto d-block" type="submit" value="Submit">
            </fieldset>
        </form>
    `)
    $('#change-password-form').on('submit', authEvents.onChangePassword)
}

const signOutModal = () => {
    $('.modal-title').text('Sign Out')
    utility.populateModalBody(`
        <form id="sign-out-form">
            <fieldset>
                <p>Are you sure you want to sign out?</p>
                <input class="btn btn-primary mx-auto d-block" type="submit" value="Submit">
            </fieldset>
        </form>
    `)
    $('#sign-out-form').on('submit', authEvents.onSignOut);
}

const gamesModal = () => {
    $('.modal-title').text('Games')
    utility.populateModalBody(`
        <div id="carouselControls" class="carousel slide" data-interval="false" data-ride="carousel">
            <div id="games-carousel" class="carousel-inner">
                <!-- Dynamic data goes here -->
            </div>
            <a class="carousel-control-prev" href="#carouselControls" role="button" data-interval="false" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselControls" role="button" data-interval="false" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    `)
   gameEvents.onGetGames()
}

export {
    signUpModal,
    signInModal,
    changePasswordModal,
    signOutModal,
    gamesModal
}