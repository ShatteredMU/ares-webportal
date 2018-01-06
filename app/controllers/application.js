import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import AuthenticatedController from 'ares-webclient/mixins/authenticated-controller';

export default Controller.extend(AuthenticatedController, {
    session: service('session'),
    hideSidebar: false,

    current_route: function() {
        return window.location;
    }.property(),
    
    mush_name: function() { 
        return aresconfig.mu_name;
    }.property(),
    
    mush_port: function() {
        return aresconfig.port;        
    }.property(),
    
    mush_host: function() {
        return aresconfig.host;        
    }.property(),
    
    mush_version: function() {
        return aresconfig.version;
    }.property(),
    
    player_name: function() {
        return this.get('session.data.authenticated.name');
    }.property(),
    
    actions: {
        logout() {
          this.get('session').invalidate();
        }
      }
});