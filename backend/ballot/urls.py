from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.conf.urls import include

from .views import CustomUserView,MemberView,IssueView,VoteView

router = routers.DefaultRouter()
router.register('users', CustomUserView)
router.register('members', MemberView)
router.register('issues', IssueView)
router.register('votes', VoteView)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]