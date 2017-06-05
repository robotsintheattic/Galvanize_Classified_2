(function() {

  angular.module('app').service('classService', service)

  service.$inject = ['$http']
  function service($http) {
    const sm = this
    sm.getClass = getClass
    sm.postClass = postClass
    sm.updateClass = updateClass
    sm.deleteClass = deleteClass

    function getClass(id) {
      return $http.get(id ? `/api/classifieds/${id}` : '/api/classifieds')
      .then((classifieds) => {
        return classifieds.data
      })
    }

    function postClass(post) {
      return $http.post('/api/classifieds', post)
      .then((classifieds) => {
        return classifieds.data
      })
    }

    function updateClass(id, classifieds) {
      return $http.patch(`/api/classifieds/${id}`, classifieds)
      .then((classifieds) => {
        return classifieds.data
      })
    }

    function deleteClass(id) {
        return $http.delete(`/api/classifieds/${id}`)
        .then((classified) => {
          return classified.data
        })
    }
  }
}())
