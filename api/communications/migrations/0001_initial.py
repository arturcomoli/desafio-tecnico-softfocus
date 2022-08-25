# Generated by Django 4.1 on 2022-08-25 21:14

import django.core.validators
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Communication",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("nome", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=254)),
                ("cpf", models.CharField(max_length=11)),
                ("tipo_lavoura", models.CharField(max_length=50)),
                ("data_colheita", models.DateField()),
                (
                    "causa_da_perda",
                    models.CharField(
                        choices=[
                            ("CHUVA EXCESSIVA", "CHUVA EXCESSIVA"),
                            ("GEADA", "GEADA"),
                            ("GRANIZO", "GRANIZO"),
                            ("SECA", "SECA"),
                            ("VENDAVAL", "VENDAVAL"),
                            ("RAIO", "RAIO"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "latitude",
                    models.DecimalField(
                        decimal_places=6,
                        max_digits=8,
                        validators=[
                            django.core.validators.MinValueValidator(-34.0),
                            django.core.validators.MaxValueValidator(5.5),
                        ],
                    ),
                ),
                (
                    "longitude",
                    models.DecimalField(
                        decimal_places=6,
                        max_digits=9,
                        validators=[
                            django.core.validators.MinValueValidator(-74.0),
                            django.core.validators.MaxValueValidator(-35.0),
                        ],
                    ),
                ),
                ("criado_em", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]