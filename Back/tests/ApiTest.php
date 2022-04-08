<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiTest extends WebTestCase
{
    private $dataGlobal = [
        "id" => 21,
        "name" => "API TEST",
        "price" => "15",
        "quantity" => "5",
        "image" => "https://rickandmortyapi.com/api/character/avatar/21.jpeg"
    ];

    public function testApiHome(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello"], $responseData);
    }

    public function testApiApi(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testFindAll(): void 
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertCount(20, $responseData);
    }

    public function testFindByID()
    {
        $prices = ["8", "9,99", "15", "16.50", "20"];
        $quantites = [0, 2,5,20,30,70];

        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products/1');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertContains($responseData["price"], $prices);
        $this->assertContains($responseData["quantity"], $quantites);
        $this->assertEquals($responseData,[
            "id" => 1,
            "name" => "Rick Sanchez",
            "price" => $responseData["price"],
            "quantity" => $responseData["quantity"],
            "image" => "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        ]);
    }

    public function testAddProduct()
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/products', $this->dataGlobal);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, $this->dataGlobal);
    }

    public function testAddProductToCart()
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/'.$this->dataGlobal["id"], $this->dataGlobal);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, ["id"=> 1, "products"=> [0 => $this->dataGlobal]]);
    }

    public function testFindCart()
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/cart');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, ["id"=> 1, "products"=> [0 => $this->dataGlobal]]);
    }

    public function testDeleteProductToCart()
    {
        $client = static::createClient();
        $client->jsonRequest('DELETE', '/api/cart/'.$this->dataGlobal["id"]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, ["id"=> 1, "products"=> []]);
    }

    public function testDeleteProduct()
    {
        $client = static::createClient();
        $client->jsonRequest('DELETE', '/api/products/'.$this->dataGlobal["id"]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertEquals($responseData, ['delete' => 'ok']);
    }

}
