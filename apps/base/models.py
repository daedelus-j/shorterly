from django.db import models
import random
import string
from libs import model_helpers


class Url(models.Model):
    url_id = models.CharField(max_length=7,
                              blank=True,
                              null=True,
                              db_index=True)


class DeviceUrl(models.Model):
    url = models.URLField(max_length=200,
                          db_index=True)
    type = models.CharField(max_length=50,
                            choices=model_helpers.Choices(
                                'DESKTOP',
                                'MOBILE',
                                'TABLET'),
                            blank=True,
                            null=True,)
    main_url = models.ForeignKey(Url,
                                 related_name='devices',
                                 on_delete=models.CASCADE)


class UrlVisit(models.Model):
    url = models.ForeignKey(DeviceUrl,
                            related_name='visits',
                            on_delete=models.CASCADE)


def generate_url_id():
    length = 7
    char = string.ascii_uppercase + string.digits + string.ascii_lowercase
    while True:
        url_id = ''.join(random.choice(char) for x in range(length))
        try:
            temp = DeviceUrl.objects.get(url_id=url_id)
        except:
            return url_id
