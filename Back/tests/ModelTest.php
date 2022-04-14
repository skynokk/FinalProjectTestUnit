<?php

namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Model\RickAndMortyModel;

class ModelTest extends TestCase {

    public function testModel(): void
    {
        $model = new RickAndMortyModel();
        $model->setName("Nom Figurine");
        $this->assertEquals("Nom Figurine", $model->getName());

        $model->setImage("imageFigurine.png");
        $this->assertEquals("imageFigurine.png", $model->getImage());
    }

}