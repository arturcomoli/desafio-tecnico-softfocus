from rest_framework.test import APITestCase
from rest_framework.views import status

from .mocks import mock1, mock2, mock3, mock4


class TestLossViews(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        ...

    def test_criar_com_mesma_causa(self):
        response = self.client.post(f"/api/perdas/", data=mock1)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)
        self.assertIn("nome", response.data)
        self.assertIn("email", response.data)
        self.assertIn("cpf", response.data)
        self.assertIn("tipo_lavoura", response.data)
        self.assertIn("data_colheita", response.data)
        self.assertIn("causa_da_perda", response.data)
        self.assertIn("criado_em", response.data)
        self.assertIn("latitude", response.data)
        self.assertIn("longitude", response.data)

        self.assertTrue(response.data["nome"].isupper())
        self.assertTrue(response.data["email"].islower())
        self.assertTrue(response.data["tipo_lavoura"].isupper())

    def test_criar_com_mesma_causa_lugares_distintos(self):
        self.client.post(f"/api/perdas/", data=mock1)

        response = self.client.post(f"/api/perdas/", data=mock4)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_criar_com_causa_diferente(self):
        self.client.post(f"/api/perdas/", data=mock1)
        response = self.client.post(f"/api/perdas/", data=mock2)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("data_colheita", response.data)
        self.assertIn("mensagem", response.data["data_colheita"])
        self.assertIn("divergencia", response.data["data_colheita"])
        self.assertIn(
            "id_da_informacao_conflitante",
            response.data["data_colheita"]["divergencia"],
        )
        self.assertIn(
            "causa_existente",
            response.data["data_colheita"]["divergencia"],
        )
        self.assertIn(
            "tentativa_de_cadastro",
            response.data["data_colheita"]["divergencia"],
        )
        self.assertIn(
            "distancia_entre_as_ocorrencias",
            response.data["data_colheita"]["divergencia"],
        )

    def test_criar_com_cpf_menor_que_11_caracteres(self):
        response = self.client.post(f"/api/perdas/", data=mock3)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("cpf", response.data)
        self.assertEqual(
            str(response.data["cpf"][0]),
            "Certifique-se de que o cpf tenha 11 caracteres.",
        )

    def test_get_filtro_cpf(self):
        list_1 = 0
        list_2 = 0
        for _ in range(0, 20):
            self.client.post(f"/api/perdas/", data=mock1)
            list_1 += 1

        for _ in range(0, 50):
            self.client.post(f"/api/perdas/", data=mock4)
            list_2 += 1

        response = self.client.get(f"/api/perdas/?cpf={mock1['cpf']}")

        self.assertEqual(20, response.data["total_registros"])

    def test_get_filtro_data(self):
        list_1 = 0
        list_2 = 0
        for _ in range(0, 20):
            self.client.post(f"/api/perdas/", data=mock1)
            list_1 += 1

        for _ in range(0, 50):
            self.client.post(f"/api/perdas/", data=mock4)
            list_2 += 1

        response = self.client.get(
            f"/api/perdas/?data_colheita={mock4['data_colheita']}"
        )

        self.assertEqual(50, response.data["total_registros"])

    def test_patch_perda(self):
        criacao = self.client.post(f"/api/perdas/", data=mock1)

        response = self.client.patch(
            f'/api/perdas/id/{criacao.data["id"]}/', data=mock4
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(mock4["nome"].upper(), response.data["nome"])
        self.assertEqual(mock4["email"].lower(), response.data["email"])
        self.assertEqual(
            mock4["tipo_lavoura"].upper(), response.data["tipo_lavoura"]
        )
        self.assertEqual(mock4["cpf"], response.data["cpf"])

    def test_patch_conflito_informacoes(self):
        criacao = self.client.post(f"/api/perdas/", data=mock1)
        response = self.client.patch(
            f'/api/perdas/id/{criacao.data["id"]}/', data=mock2
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_perda(self):
        criacao = self.client.post(f"/api/perdas/", data=mock1)

        response = self.client.delete(f'/api/perdas/id/{criacao.data["id"]}/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
