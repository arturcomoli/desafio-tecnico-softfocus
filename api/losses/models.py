import uuid

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class LossChoices(models.TextChoices):
    CHUVA_EXCESSIVA = ("CHUVA EXCESSIVA", "CHUVA EXCESSIVA")
    GEADA = ("GEADA", "GEADA")
    GRANIZO = ("GRANIZO", "GRANIZO")
    SECA = ("SECA", "SECA")
    VENDAVAL = ("VENDAVAL", "VENDAVAL")
    RAIO = ("RAIO", "RAIO")


class Loss(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cpf = models.CharField(max_length=11)
    # location = models.PointField(geography=True)
    tipo_lavoura = models.CharField(max_length=50)
    data_colheita = models.DateField()
    causa_da_perda = models.CharField(
        max_length=20, choices=LossChoices.choices
    )
    # localizacao = models.JSONField()
    # latitude = models.FloatField(max_value=90)
    latitude = models.DecimalField(
        max_digits=8,
        decimal_places=6,
        validators=[
            MinValueValidator(-34.000000),
            MaxValueValidator(5.500000),
        ],
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        validators=[
            MinValueValidator(-74.000000),
            MaxValueValidator(-35.000000),
        ],
    )
    criado_em = models.DateTimeField(auto_now_add=True)

    def save(
        self,
        force_insert: bool = False,
        force_update: bool = False,
        *args,
        **kwargs,
    ):
        self.nome = self.nome.upper()
        self.email = self.email.lower()
        self.tipo_lavoura = self.tipo_lavoura.upper()
        super(Loss, self).save(force_insert, force_update, *args, **kwargs)

    # return super().save(force_insert, force_update, using, update_fields)
