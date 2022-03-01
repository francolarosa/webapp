const PMT = document.querySelector('page-manager-template');
PMT.$.urlPage('sarasa');

document.addEventListener('go-to-page', (e) => {
    PMT.setAttribute('url-page', e.detail.page);
});




