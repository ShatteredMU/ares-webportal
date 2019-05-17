import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    flashMessages: service(),
    gameApi: service(),

    actions: {
        gmsChanged(new_gms) {
          this.set('model.portal.gms', new_gms);
        },
        allschoolsChanged(new_schools) {
          this.set('model.portal.all_schools', new_schools);
        },
        primaryschoolChanged(new_school) {
          this.set('model.portal.primary_school', new_school);
        },
        save() {
            let api = this.get('gameApi');
            api.requestOne('portalEdit', {
               id: this.get('model.portal.id'),
               name: this.get('model.portal.name'),
               gms: (this.get('model.portal.gms') || []).map(gm => gm.name),
               location: this.get('model.portal.location'),
               primary_school: this.get('model.portal.primary_school.name'),
               all_schools: (this.get('model.portal.all_schools') || []).map(s => s.name),
               pinterest: this.get('model.portal.pinterest'),
               description: this.get('model.portal.edit_desc'),
               creatures: this.get('model.portal.edit_creatures'),
               npcs: this.get('model.portal.edit_npcs'),
               trivia: this.get('model.portal.edit_trivia'),
               events: this.get('model.portal.edit_events')}, null)
            .then( (response) => {
                if (response.error) {
                    return;
                }
                this.transitionToRoute('portal',
                this.get('model.portal.id'));
                this.get('flashMessages').success('Portal updated!');
            });
        }
    }
});
