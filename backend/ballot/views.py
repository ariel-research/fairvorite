from rest_framework import viewsets, permissions, status
from .models import CustomUser,Member,Issue,Vote
from .serializers import CustomUserSerializer,MemberSerializer,IssueSerializer,VoteSerializer
from .forms import IssueForm
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

from django.utils.translation import gettext_lazy as _


class CustomUserView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class MemberView(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class IssueView(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = (AllowAny,)

    def value(self,request):
        """
        issue's calculated value
        """
        pass

    @action(detail=False, methods=['POST'])
    def add_issue(self,request):
        user = request.user
        req_data = request.data
        form = IssueForm(req_data)
        if form.is_valid():
            issue = form.save(commit=False)
            issue.created_by = user
            issue.save()
            res_data = {'message': 'The issue has been created successfully'}
            return Response(res_data, status=status.HTTP_201_CREATED)
        
        res_data = {'message': 'Issue details are not valid'}
        return Response(res_data, status=status.HTTP_400_BAD_REQUEST)

    

class VoteView(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['POST'])
    def vote_issue(self,request):
        """
        vote for issue.
        if vote is existed, change value to DOWN. 
        """
        user = request.user
        member = Vote.objects.get(user=user)
        req_data = request.data
        issue = req_data.get('issue')
        value = req_data.get('value',Vote.Value.UP)
        
        vote_obj, created = Vote.objects.update_or_create(voter=member, issue=issue,
                                                          defaults={
                                                              'value': value
                                                          })
        
        res_data = {'message': _('vote_accpeted')}
        return Response(res_data, status=status.HTTP_201_CREATED if created
                                        else status.HTTP_200_OK)