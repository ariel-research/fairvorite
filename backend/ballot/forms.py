from django import forms
from .models import CustomUser
from django.contrib.auth.forms import UserCreationForm,UserChangeForm


class LoginForm(forms.Form):
    email = forms.EmailField(max_length=200)
    password = forms.CharField(max_length=65, widget=forms.PasswordInput)
    

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(max_length=200)
    class Meta:
        model = CustomUser
        fields =  ('email',)

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields =  ('email',)
