<?php

namespace App\Tests;

use Symfony\Component\HttpClient\MockHttpClient;
use Symfony\Component\HttpClient\Response\MockResponse;
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;

class MockApiTest extends TestCase{

    public function testMockApi() : void {
        $mockApi = [
            "results" => [
                [
                    "id" => 1,
                    "name" => "Rick Sanchez",
                    "image" => "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                ],
                [
                    "id" => 2,
                    "name" => "Morty Smith",
                    "image" => "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
                ],
            ]
        ];

        $mock = new MockHandler([
            new Response(200, ['Content-Length' => "application/json"], json_encode($mockApi)),
        ]);

        $handlerStack = HandlerStack::create($mock);
        $client = new Client(['handler' => $handlerStack]);

        $response = $client->request('GET', 'https://rickandmortyapi.com/api/character');
        $responseBody = json_decode($response->getBody(), true);

        $this->assertEquals($mockApi, $responseBody);
    }
}
