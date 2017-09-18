class AdItemView extends View {

    constructor(element) {

        super(element);
    }

    template(model) {

        return `
            ${model.ads.map(ad => `
                <div class="col-xs-12 hidden-md-down">
                    <a href="details.html" class="card block mg-bt-15 interactive">
                        <div class="card-body pd-15 color text-primary-black">
                            <div class="space-between center">
                                <div class="v-align-children text-nowrap lg-main-list-line-part pd-15">
                                    <div class="texts mg-lt-5">
                                        <span class="block text-ellipsis" title="${ad.name}">${ad.name}</span>
                                        <span class="caption block color text-secondary-black" title="${ad.category}">${ad.category}</span>
                                    </div>
                                </div>
                                <div class="full-width lg-main-list-line-part pd-lt-15 pd-rt-15">
                                    <p>${ad.description}</p>
                                </div>
                                <div class="v-align-children text-nowrap color text-secondary-black lg-main-list-line-part pd-lt-30 pd-rt-15">
                                    <div class="v-align-children text-nowrap mg-rt-15">
                                        <i class="material-icons sz-18">thumb_up</i>
                                        <small class="mg-lt-5 reacts-btn-icon-24">1204</small>
                                    </div>
                                    <div class="v-align-children text-nowrap mg-rt-15">
                                        <i class="material-icons sz-18">thumb_down</i>
                                        <small class="mg-lt-5 reacts-btn-icon-24">1204</small>
                                    </div>
                                    <div class="v-align-children text-nowrap">
                                        <i class="material-icons sz-18">message</i>
                                        <small class="mg-lt-5 reacts-btn-icon-24">1204</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-xs-12 hidden-lg-up">
                    <div class="card mg-bt-15 interactive">
                        <div class="card-header">
                            <div class="left">
                                <div class="texts">
                                    <span class="wrap block text-break-all">${ad.name}</span>
                                    <span class="wrap caption block color text-secondary-black text-break-all">${ad.category}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pd-rt-15 pd-lt-15">
                            <span>${ad.description}</span>
                        </div>
                        <div class="card-footer">
                            <div class="right text-right color text-secondary-black">
                                <div class="v-align-children text-nowrap mg-rt-15">
                                    <i class="material-icons sz-18">thumb_up</i>
                                    <small class="mg-lt-5 reacts-btn-icon-24">1204</small>
                                </div>
                                <div class="v-align-children text-nowrap mg-rt-15">
                                    <i class="material-icons sz-18">thumb_down</i>
                                    <small class="mg-lt-5 reacts-btn-icon-24">1204</small>
                                </div>
                                <div class="v-align-children text-nowrap">
                                    <i class="material-icons sz-18">message</i>
                                    <small class="mg-lt-5 reacts-btn-icon-24">1204</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    }
}
