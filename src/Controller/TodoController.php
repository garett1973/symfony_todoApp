<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/todo', name: 'todo')]
class TodoController extends AbstractController
{

    private EntityManagerInterface $em;
    private TodoRepository $todoRepository;

    public function __construct(EntityManagerInterface $em, TodoRepository $todoRepository) {

        $this->em = $em;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'todo_read')]
    public function read(): Response
    {
        $todos = $this->todoRepository->findAll();
        $allTodos = [];
        foreach ($todos as $todo) {
            $allTodos[] = $todo->toArray();
        }
        return $this->json($allTodos);
    }
}
