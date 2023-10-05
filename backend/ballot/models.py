from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    title = models.CharField(_("title"), max_length=255,blank=True)
    avatar = models.ImageField(_("avatar"), upload_to='users/avatars/')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    def __str__(self) -> str:
        return self.get_full_name()
    
    def get_full_name(self) -> str:
        return f'{self.first_name} {self.last_name}'
    

class Member(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = _('member')
        verbose_name_plural = _('members')

    def __str__(self) -> str:
        return str(self.user)
    

class Issue(models.Model):
    class Status(models.TextChoices):
        OPEN = 'OP', _('open')
        CLOSED = 'CL', _('closed')
        ACCEPTED = 'ACC', _('accepted')
        HANDLED = 'HAN', _('handled')

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name=_("created_by"))
    title = models.CharField(_("title"), max_length=255,blank=True)
    description = models.TextField(_("description"))
    status = models.CharField(choices=Status.choices,default=Status.OPEN, verbose_name=_("status"),max_length=4)
    created_at = models.DateTimeField(_("created_at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated_at"), auto_now=True)
    indexes = [
            models.Index(fields=["created_by"]),
        ]
    
    class Meta:
        verbose_name = _('issue')
        verbose_name_plural = _('issues')
    
    def __str__(self) -> str:
        return f'{self.title}'
    
    def get_date(self):
       return self.updated_at, 'edited' if self.updated_at > self.created_at else self.created_at, 'created'
    
    def get_creator(self):
        return self.created_by.get_full_name()
    
    def is_creator_manager(self):
        return self.created_by.is_superuser()
    

class Vote(models.Model):
    class Value(models.IntegerChoices): # should change in the future
        DOWN = -1, _('down')
        UP = 0, _('up')

    issue = models.ForeignKey(Issue,on_delete=models.CASCADE, verbose_name=_("issue"))
    voter = models.ForeignKey(Member,on_delete=models.CASCADE, verbose_name=_("voter"))
    value = models.IntegerField(choices=Value.choices,default=Value.UP, verbose_name=_("value")) # scale
    
    class Meta:
        verbose_name = _('vote')
        verbose_name_plural = _('votes')

        constraints = [
            models.UniqueConstraint(
                fields=['issue', 'voter'],
                name='vote'
            ),
        ]
    
    def __str__(self) -> str:
        return f'{self.voter} votes for {self.issue}'

